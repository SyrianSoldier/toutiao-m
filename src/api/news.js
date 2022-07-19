import request from '@/utils/request'

/**
 * 获取频道的文章
 * @param {*} channelId 频道的id
 * @param {*} timestamp 获取第一页的文章, 传当前时间戳. 获取上一页的文章, 传pre_timestamp
 * @returns Promise
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
