import Fetch from '@/utils/fetch'
import FetchImg from '@/utils/fetch_img'

const state = {
  ArticleLabelList: [],
  ArticleCategoryList: [],
  key_list: []
}
const mutations = {
  Article_Label_List: (state, list) => {
    state.ArticleLabelList = list
  },
  Article_Category_List: (state, list) => {
    state.ArticleCategoryList = list
  },
  key_list: (state, list) => {
    state.key_list = list
  }
}

const actions = {
  GetArticleCategoryList({ commit, state, dispatch }, hallId) {
    return new Promise(async(resolve, reject) => {
      Fetch.post('/systemApi/GetArticleCategoryList', {
        hallId: hallId
      })
        .then(res => {
          commit('Article_Category_List', res)
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  // systemapi/GetArticleLabelList
  GetArticleLabelList({ commit, state, dispatch }, hallId) {
    return new Promise(async(resolve, reject) => {
      Fetch.post('/systemApi/GetArticleLabelList', {
        hallId: hallId
      })
        .then(res => {
          commit('Article_Label_List', res)
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  // 上传图片
  UploadImage({ commit, state, dispatch }, params) {
    return new Promise(async(resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      Fetch.post('/Aboutapi/UploadImage', params, config)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  // UploadMp3
  UploadMp3({ commit, state, dispatch }, params) {
    return new Promise(async(resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      Fetch.post('/Aboutapi/UploadMp3', params, config)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  // 上传图片
  UploadVideo({ commit, state, dispatch }, params) {
    return new Promise(async(resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      FetchImg.post('/Image/UploadImage', params, config)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  GetFilterBoxList({ commit, state, dispatch }, hallId) {
    return new Promise(async(resolve, reject) => {
      Fetch.post('/PopularScienceapi/GetFilterBoxList', {
        hallId: hallId
      })
        .then(res => {
          commit('key_list', res)
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
