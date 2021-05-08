/*
 * @Author: your name
 * @Date: 2021-03-29 19:00:07
 * @LastEditTime: 2021-05-02 11:15:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\registeration\src\main.js
 */
import Vue from 'vue'
import './plugins/element.js'
import router from './router'
import './assets/css/global.css'
import App from './App.vue'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8888/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.prototype.$qs = qs

//  阻止控制台产生生产模式的消息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
