import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import BasicLayout from '@/layout/BasicLayout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        hidden: true,
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/icon',
    hidden: true,
    component: BasicLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/ruddertitle',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/ruddertitle/index'),
        name: 'ruddertitle',
        meta: { title: '头衔列表', icon: 'icon-', noCache: true }
      }
    ]
  },
  {
    path: '/article',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/article/index'),
        name: 'article',
        meta: { title: '文章管理', icon: 'education', noCache: true }
      }
    ]
  },
  {
    path: '/product',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/product/index'),
        name: 'product',
        meta: { title: '商品管理', icon: 'shopping', noCache: true }
      }
    ]
  },
  {
    path: '/statistics',
    component: BasicLayout,
    redirect: '/statistics/article',
    meta: { title: '统计管理', icon: 'tree', noCache: true },
    children: [
      {
        path: '/statistics/article',
        component: () => import('@/views/statistics/page/article/index'),
        name: 'statistics-article',
        meta: { title: '文章统计', icon: 'tree', noCache: true }
      },
      {
        path: '/statistics/hallRelation',
        component: () => import('@/views/statistics/page/hallRelation/index'),
        name: 'statistics-hallRelation',
        meta: { title: '关系图', icon: 'tree', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const admiinRouter = [
  {
    path: '/member',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/member/index'),
        name: 'member',
        meta: { title: '会员管理', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/Shop',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Shop/index'),
        name: 'Shop',
        meta: { title: '店铺有效期管理', icon: 'dianpu', noCache: true }
      }
    ]
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
