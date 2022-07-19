<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" />搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多的按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>

    <!-- 弹框 -->
    <EditChannelPopup
      ref="popup"
      :myChannels="myChannels"
      @del-mychanel="delMychannel"
      @change-active="changeActive"
      @add-mychannel="addMyChannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
// 引入API
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelToLocal,
  delMyChannel,
  addMyChannel
} from '@/api'
// 引入组件
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    EditChannelPopup
  },
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  created () {
    // 获取我的频道列表
    this.getMyChannels()
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 获取我的频道列表
    async getMyChannels () {
      // res一定有data

      try {
        // const { data } = await getMyChannels()
        // this.myChannels = data.data.channels
        if (!this.isLogin) {
          // 如果你是离线状态
          //  - 1 如果本地存储有数据, 直接用本地存储的数据
          //  - 2 如果本地存储没数据, 发送请求获取默认频道数据
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          // 如果你是登录状态
          // 发请求获取的
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    // 展示弹层
    showPopup () {
      // this.isShow = true
      this.$refs.popup.isShow = true
    },
    // 更改频道的active
    changeActive (active) {
      this.active = active
    },
    // 删除我的频道
    async delMychannel (id) {
      // 删除我的频道
      this.myChannels = this.myChannels.filter((item) => item.id !== id)

      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据存储在本地存储中
        setMyChannelToLocal(this.myChannels)
      } else {
        // 如果你是登录状态
        // 发送接口 删除频道
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    async addMyChannel (channel) {
      // 添加频道
      this.myChannels.push(channel)

      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据存储在本地存储中
        setMyChannelToLocal(this.myChannels)
      } else {
        // 如果你是登录状态
        // 发送接口 添加频道
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }

      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style scoped lang="less">
// 头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
