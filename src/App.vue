<template>
  <div>
    <!-- 一级路由的出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 频道持久化方案
// - 离线状态
//  - 后台返回的频道是默认的
//  - 保存在本地存储中

// - 登录状态
// - 后台返回的频道是用户的
// - 保存在服务器中
export default {
  data () {
    return {}
  }
}
</script>

<style scoped></style>
