import axios from 'axios'
import Message from 'ant-design-vue/lib/message'
import { uuid } from './uuid'
import store from '@/store'
import { getToken } from '@/utils/auth'
const service = axios.create({
  baseURL: 'http://tianshiupload.getfitvip.com/baseApiTwo',
  timeout: 500000,
  headers: {
    'Request-Id': uuid(),
    'Content-Type': 'application/xml;charset=UTF-8'
  }
})

// 添加一个请求拦截器
service.interceptors.request.use(
  config => {
  // Do something before request is sent
    if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const { data: body } = response
    const { Data } = body
    const message = body.Message
    if (body === '') {
      Message.error('请求失败')
      return Promise.reject(new Error(message || 'Error'))
    } else {
      return Data || body
    }
  },
  error => {
    Message.error(error.Message)
    return Promise.reject(error)
  }
)

export default service
