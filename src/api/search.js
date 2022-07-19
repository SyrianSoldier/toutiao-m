import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {String} q 搜索建议的关键词
 * @returns Promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
