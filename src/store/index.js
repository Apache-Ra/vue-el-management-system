import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/**
 * 状态监听
 */
const store = new Vuex.Store({})
store.registerModule('vux', {
  state: {
    showLoader: false,
    loaderContent: '正在加载···',
    updateData: null,
    loginStatus: null
  },
  mutations: {
    uploadShowLoader(state, showLoader) {
      state.showLoader = showLoader
    },
    // loading内容更新
    uploadLoaderContent(state, loaderContent){
      state.loaderContent = loaderContent
    },
    // 数据更新
    dataUpload(state, updateData) {
      state.updateData = updateData
    },
    // 登录状态监听
    uploadLoginStatus(state, loginStatus){
      state.loginStatus = loginStatus
    }
  },
  getters: {},
  actions: {},
  moudles: {}
})
/**
 * 出口
 */
export default store
