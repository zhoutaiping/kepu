import axios from 'axios'
import { Message } from 'element-ui'
import { uuid } from './uuid'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
const service = axios.create({
  baseURL: '/api',
  timeout: 50000,
  headers: {
    'Request-Id': uuid(),
    'Content-Type': 'application/json'
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
    const { status: statusCode, data: body } = response
    const { status = 0, Data } = body

    if (status) {
      const message = Data.Message

      if (statusCode === 200) {
        if (status >= 0 && message !== '') {
          if (parseInt(status, 10) !== 1) {
            if (status === 16149) {
              localStorage.removeItem('userInfo')
              localStorage.clear()
              removeToken()
              setTimeout(() => { window.location.href = '/login' }, 500)
            } else {
              const dataMessage = JSON.stringify(Data) === '[]' ? '' : Data
              Message({
                message: dataMessage || message,
                type: 'warning'
              })
            }
            return Promise.reject(message)
          }
        }
      } else {
        Message({
          message,
          type: 'error'
        })
        return Promise.reject(message)
      }
    }

    return Data || body
  },
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
