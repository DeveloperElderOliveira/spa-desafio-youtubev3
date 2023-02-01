import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videosnovos: ""
  },
  getters: {

  },
  mutations: {
    SET_VIDEOS(state,videos){
      state.videosnovos = videos;
    }
  },
  actions: {
    setVideos({ commit }, videos) {
        // localStorage.setItem('token', credentials.token)
        commit('SET_VIDEOS', videos)
        // localStorage.setItem('user_email', credentials.email)
        // commit('SET_USER_EMAIL', credentials.email)
    },
  },
  modules: { auth}
})
