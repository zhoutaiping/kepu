import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import Fetch from '@/utils/fetch'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  hall_list: [],
  hall_key: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  HALL_LIST: (state, hall_list) => {
    state.hall_list = hall_list
  },
  HALL_KEY: (state, hall_key) => {
    state.hall_key = hall_key
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const params = {
      username: userInfo.username.trim(),
      password: userInfo.password
    }
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      Fetch.post('/CMSapi/Login', params).then(res => {
        commit('SET_TOKEN', res.UserId)
        setToken(res.UserId)
        localStorage.setItem('userInfo', JSON.stringify(res))
        localStorage.setItem('hall_key', res.HallList[0].Id || '')
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const data = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: userInfo.RealName
      }
      const { roles, name, avatar, introduction } = data
      // HallList
      commit('HALL_LIST', userInfo.HallList)
      commit('HALL_KEY', localStorage.getItem('hall_key') || '')

      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  changeHallKey({ commit, dispatch }, id) {
    return new Promise(resolve => {
      commit('HALL_KEY', id || '')
      resolve()
    })
  },
  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
