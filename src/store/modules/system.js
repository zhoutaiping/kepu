import Fetch from '@/utils/fetch'
import FetchImg from '@/utils/fetch_img'

const state = {
  ArticleLabelList: [],
  ArticleCategoryList: []
}
const mutations = {
  Article_Label_List: (state, list) => {
    state.ArticleLabelList = list
  },
  Article_Category_List: (state, list) => {
    state.ArticleCategoryList = list
  }
}

const actions = {
  GetArticleCategoryList({ commit, state, dispatch }, hall_Id) {
    return new Promise(async(resolve, reject) => {
      Fetch.post('/systemApi/GetArticleCategoryList', { 'hallId': '0c978ce07414492c9ae9287ba21b98ba' }).then(res => {
        commit('Article_Category_List', res)
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },

  // systemapi/GetArticleLabelList
  GetArticleLabelList({ commit, state, dispatch }, hall_Id) {
    return new Promise(async(resolve, reject) => {
      Fetch.post('/systemApi/GetArticleLabelList', { 'hallId': '0c978ce07414492c9ae9287ba21b98ba' }).then(res => {
        commit('Article_Label_List', res)
        resolve(res)
      }).catch(e => {
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
      Fetch.post('/Aboutapi/UploadImage', params, config).then(res => {
        resolve(res)
      }).catch(e => {
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
      FetchImg.post('/Image/UploadImage', params, config).then(res => {
        resolve(res)
      }).catch(e => {
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

