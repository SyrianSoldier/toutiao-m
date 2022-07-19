import dayjs from 'dayjs'
// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// 配置中文包, dayjs默认是英文
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

export default dayjs
