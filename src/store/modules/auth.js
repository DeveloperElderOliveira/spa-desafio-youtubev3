import AuthenticationService from '@/services/AuthenticationService'

const state = {
  url: process.env.VUE_APP_URL,
  token: localStorage.getItem('token') || null,
  user_email: localStorage.getItem('user_email') || null,
  isUserLoggedIn: localStorage.getItem('token') || false
}

const getters = {
  getUrl: (state) => {
    return state.url
  },
  isAuthenticated: (state) => {
    return state.isUserLoggedIn
  },
  getToken: (state) => {
    return state.token
  },
  currentUser: (state) => {
    return state.user_email
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      state.isUserLoggedIn = true
    } else {
      state.isUserLoggedIn = false
    }
  },
  SET_USER_EMAIL(state, email) {
    state.user_email = email
  },
  CLEAR_AUTH(state) {
    state.token = null
    state.user_email = null
    state.isUserLoggedIn = false
  }
}

const actions = {
  signUp({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      AuthenticationService.signUp(credentials)
        .then(({ data }) => {
          commit('SET_TOKEN', data.token)
          localStorage.setItem('token', data.token)
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  },
  signIn({ commit }, credentials) {  
        localStorage.setItem('token', credentials.token)
        commit('SET_TOKEN', credentials.token)
        localStorage.setItem('user_email', credentials.email)
        commit('SET_USER_EMAIL', credentials.email)
  },
  getCurrentUser() {
    return state.user_email;
  },
  signOut({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user_email')
    commit('CLEAR_AUTH')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
