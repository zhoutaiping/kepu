import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'
import '@/core/user'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
