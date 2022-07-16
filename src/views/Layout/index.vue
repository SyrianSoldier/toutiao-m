<template>
  <div>
    <!-- 二级路由页面 -->
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="text">{{
            !!$store.state.user.token ? '我的' : '未登录'
          }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// route 路由模式是什么意思
//  1. 每一个item 绑定了to属性
//  2. route模式, 就是拿到path以后, 和to属性里面的值比对, 比对成功, 就高亮
export default {
  name: 'Layout',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  .toutiao {
    font-size: 0.53333rem;
  }
  .text {
    font-size: 0.32rem;
  }
}
</style>
