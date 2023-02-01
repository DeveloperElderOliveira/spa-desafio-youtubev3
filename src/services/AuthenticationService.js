import Api from '@/services/Api'

export default {
  signIn(credentials) {
    return Api().post('auth/login', credentials)
  }
}
