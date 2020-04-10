import Vue from 'vue'
// 组件
import BasicLayout from '@/layout/BasicLayout'
import BlankLayout from '@/layout/BlankLayout'
import ConsolePage from '@/layout/console-page'
import Dm from '@/components/Dm'
import DmScroll from '@/components/DmScroll'
// 注册
Vue.use(Dm)
Vue.component('DmScroll', DmScroll)
Vue.component('BasicLayout', BasicLayout)
Vue.component('BlankLayout', BlankLayout)
Vue.component('ConsolePage', ConsolePage)
