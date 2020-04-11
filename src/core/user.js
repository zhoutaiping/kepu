import Vue from 'vue'

import * as filters from '@/filters' // global filters

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission' // permission control
import '@/utils/error-log' // error log
import './ui/index'

import Fetch from '@/utils/fetch'
import FetchJava from '@/utils/fetch_java'
import FetchImg from '@/utils/fetch_img'
import Message from '@/utils/message'
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.Fetch = Fetch
Vue.prototype.FetchJava = FetchJava
Vue.prototype.FetchImg = FetchImg
Vue.config.productionTip = false
Vue.prototype.Message = Message
