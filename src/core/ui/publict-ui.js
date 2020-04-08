import Vue from 'vue'
// 组件
import BasicLayout from '@/layout/BasicLayout'
import BlankLayout from '@/layout/BlankLayout'
import ConsolePage from '@/layout/console-page'
import Dm from '@/components/Dm'
// 注册
Vue.use(Dm)
Vue.component('BasicLayout', BasicLayout)
Vue.component('BlankLayout', BlankLayout)
Vue.component('ConsolePage', ConsolePage)
