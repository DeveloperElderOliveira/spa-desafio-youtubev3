import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videosnovos: "",
    historic: []
  },
  getters: {
    getHistoric: (state) => {
      return state.historic
    },
  },
  mutations: {
    SET_VIDEOS(state,videos){
      state.videosnovos = videos;
    },
    SET_HISTORIC(state,historic){
      state.historic.push(historic);
    },
  },
  actions: {
    setVideos({ commit }, videos) {

        commit('SET_VIDEOS', videos)

    },
    setHistoric({ commit }, historic) {

      commit('SET_HISTORIC', historic)

  },
  },
  modules: { auth}
})
