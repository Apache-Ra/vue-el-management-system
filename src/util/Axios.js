/**
 * Axios 请求二次封装
 */

import Vue from 'vue'
import Axios from 'axios'
import router from '../router'
let vue = new Vue({router, Axios})
const httpServer = (options) => {
  const defaultOptions = {
    method: options.method,
    baseURL: vue.SERVER_NAME + vue.API_PREFIX,
    url: options.url,
    data: options.data,
    params: Object.assign(options.data),
    timeout: 30000,
    headers: options.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  /**
   * 对GET OR !GET请求处理
   */
  if (options.method === 'get') {
    delete defaultOptions.data
  } else {
    delete defaultOptions.params
  }
  /**
   * axios请求处理
   * @type {Promise}
   */
  let promise = new Promise((resolve, reject) => {
    Axios(defaultOptions).then(response => {
      // store.commit('updateLoading', true)
      if (handleApiResponseStatus(response.data)) resolve(response.data)
    }).catch((error, status) => {
      if (handleHttpResponseStatus(error, status)) reject(error, status)
    })
  })
  return promise
}
/**
 * 请求拦截器
 */
Axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error, status)
})
/**
 * 请求响应拦截
 */
Axios.interceptors.response.use(data => {
  return data
}, error => {
  return Promise.reject(error, status)
})
/**
 *  处理接口响应状态
 *  处理通用接口异常，比如登录超时之类的2000错误接口
 */
let handleApiResponseStatus = response => {
  // store.commit('updateLoading', false)
  if (response.code === '200') {
    return true
  } else {
    console.log((response.data.msg)?response.data.msg : '服务器异常',)
  }
}
/**
 *  处理Http响应状态
 *  处理请求异常比如网络异常
 */
let handleHttpResponseStatus = (error, status) => {
  console.log('网络链接异常，请稍后重试！')
  return false
}
export default httpServer
