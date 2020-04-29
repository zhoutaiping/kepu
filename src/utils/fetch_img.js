import request from '@/utils/request-raw-img'
// import qs from 'qs'

export default {
  post(url, data, config) {
    return request({
      url,
      method: 'POST',
      data,
      config
    })
  },
  put(url, data, params) {
    return request({
      url,
      method: 'PUT',
      data,
      params
    })
  },
  delete(url, data, params) {
    return request({
      url,
      method: 'DELETE',
      data,
      params
    })
  },
  get(url, params) {
    return request({
      url,
      method: 'GET',
      params
    })
  }
}
