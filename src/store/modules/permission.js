import { asyncRoutes, constantRoutes, admiinRouter } from '@/router'
import { getToken } from '@/utils/auth'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 32f9c99c52ad4f0ab910f0b59de22018
      let userMenu = asyncRoutes
      if (getToken() === '32f9c99c52ad4f0ab910f0b59de22018') {
      //
      }
      userMenu = userMenu.concat(admiinRouter)
      commit('SET_ROUTES', userMenu)
      resolve(userMenu)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
