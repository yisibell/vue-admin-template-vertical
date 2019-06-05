import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

import layer from '@/components/layer'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,   // api 的 base_url
  timeout: 30000                   // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {

    const res = response.data

    // 可加入响应的逻辑处理 ...

    return res;

  },
  error => {
    console.log('err' + error) // for debug

    layer.msg( error.message , { type: 'error' , time: 5000 } )
  
    return Promise.reject(error)
  }
)

export default service
