// 封装本地存储
// class 封装 继承 多态
class Storage {
  // localstorage.setItem
  // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
  set (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN'))
  get (key) {
    // 如果parse的是一个JSON格式字符串 , return JSON.parse()
    // 不是呢? return原数据
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()
export default storage
