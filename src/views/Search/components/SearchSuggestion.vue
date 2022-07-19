<template>
  <div>
    <van-cell v-for="(item, index) in highlightData" :key="index">
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>

      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 引入API
import { getSearchSuggestion } from '@/api'
export default {
  props: {
    // 搜索关键词
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    // 监视属性绑定的函数, 如果是methods里面的函数, 支持字符串的写法
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 获取搜索建议, 并处理数据
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)

        this.suggestions = res.data.data.options.filter(Boolean)

        if (this.suggestions.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    highlightData () {
      // 将搜索建议的每一项处理
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
