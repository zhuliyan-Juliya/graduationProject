import axios from "axios"

// 创建实例
const hotGame = axios.create({
  // baseUrl: 
})
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.headers.post["Content-Type"] = "application/json"
// 
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get['Pragma'] = 'no-cache'
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // config.url = config.url + '?timestamp=' + +new Date()
    // 测试服添加 手动token
    if (process.env.NODE_ENV === 'development') {
    }
    return config
  },
  error => Promise.reject(error)
)
// 响应拦截器
axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

// 封装请求方法 Post和 Get
export default {
  askPost: function (url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  askGet: function (url, queryInfo) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: queryInfo })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  askDelete: function (url, queryInfo) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, { data: queryInfo })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  askPut: function (url, queryInfo) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, queryInfo)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
