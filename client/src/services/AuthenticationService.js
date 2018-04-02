import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  addGenre (credentials) {
    return Api().post('genre/add', credentials)
  },
  getGenre () {
    return Api().get('genre')
  }
}
