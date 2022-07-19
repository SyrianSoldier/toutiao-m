<template>
  <div>
    <!-- 头部搜索框 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>

    <!-- 搜索历史/建议/结果 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
// 引入组件
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      // 搜索关键词
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    componentName () {
      // 搜索结果: 搜索框没有值或者是空字符串
      // 搜索结果: isShowSearchResult=ture
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }

      return 'SearchSuggestion'
    }
  },
  methods: {
    // 搜索
    onSearch () {
      // 显示搜索结果
      this.isShowSearchResult = true
      console.log('正在搜索')
    },
    // 返回上一页
    backToPrePage () {
      this.$router.go(-1)
    },
    // 显示搜索建议
    visibleSearchSuggestion () {
      // 如果keywords没有值 显示搜索历史
      // 如果keywords有值 显示搜索建议
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
