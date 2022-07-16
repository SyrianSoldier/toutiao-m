<template>
  <div>
    <!-- 一级路由的出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 1.下载axios
// 2. axios 默认配置
// 3. 需要在每一次请求前 自动加上token
export default {
  data () {
    return {}
  }
}
</script>

<style scoped></style>
