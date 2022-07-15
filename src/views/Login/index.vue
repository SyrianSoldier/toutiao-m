<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar" title="登录" @click-left="backToPrePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 手机号/验证码表单 -->
    <!--  <van-field></van-field> : 输入框 包括各种type类型的输入,text,password.. textarea -->
    <!-- form里input 必须给name, 用于标识 -->
    <van-form ref="form" class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 左侧字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <!-- 右侧验证码图标 -->
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          />
          <!-- 发送验证码图标 -->
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
/*
1. 如何从vuex拿数据
//  - this.$store.state.变量名
2. 修改数据
//  - vuex的数据, 必须在vuex中修改
//  - mutations 声明一个方法,去修改
//  - mutations里的方法, 第一个参数是state

 3.怎么去调用mutations里的方法
 // - $store.commit('mutations里的方法名',参数)

 // 4. 身份证
 // - token
*/
// 引入api
import { login, sendCode } from '@/api/user'
// 引入校验规则
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    // 返回来之前的页面
    backToPrePage () {
      this.$router.back()
    },
    // 登录
    async login () {
      // #region
      // 1. await 修饰什么? Promise
      // 2. res 拿到的是什么?
      //  - Promise resolve的结果
      //  - axios对本次请求 resolve的结果
      //  - 服务器返回真正的数据在res.data
      //  - 服务器返回的状态码 res.status

      // 3. error是什么
      //  - axios封装的Promise里 reject的结果
      //  - error.response.status 拿到服务器返回的状态码
      //  - error.response.data 服务器返回的真正的数据
      // #endregion
      // loading
      this.$toast.loading({
        message: '不要着急.加载中..',
        // loading时, 禁止点击页面
        forbidClick: true
      })

      try {
        const res = await login(this.mobile, this.code)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        // 跳转页面
        this.$router.push('/profile')
        // 提示成功
        this.$toast.success('登录成功')
      } catch (error) {
        // 拿到后端状态码
        const status = error.response.status
        // 默认失败消息
        let message = '登录错误, 请刷新~'

        if (status === 400) {
          // 如果是400, 使用服务器提供的消息
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
    },
    // 发送验证码
    async sendCode () {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求, 获取验证码
        await sendCode(this.mobile)
        // 显示倒计时
        this.isShowCountDown = true
      } catch (error) {
        // 1. 表单校验失败
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          // 2. 发送验证码导致的失败
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// 自定义导航栏样式
//  :deep() 穿透scoped样式
.navbar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }

  .van-icon {
    color: #fff;
  }
}

// 表单域样式
.form {
  :deep(.van-field__label) {
    flex: 1;
  }

  :deep(.van-cell__value) {
    flex: 20;
  }

  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
