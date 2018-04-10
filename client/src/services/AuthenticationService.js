import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  // genre
  addGenre (credentials) {
    return Api().post('genre/add', credentials)
  },
  getGenre () {
    return Api().get('genre')
  },
  // seat
  generateSeat () {
    return Api().post('seat/generate')
  },
  getSeat () {
    return Api().get('seat')
  },
  // theater
  generateTheater () {
    return Api().post('theater/generate')
  },
  getTheater () {
    return Api().get('theater')
  },
  // Plaza
  addPlaza (credentials) {
    return Api().post('plaza/add', credentials)
  },
  getPlaza () {
    return Api().get('plaza')
  },
  getPlazaById (plazaId) {
    return Api().get('plaza/' + plazaId)
  },
  // Movie
  getMovie () {
    return Api().get('movie')
  },
  getMovieById (movieId) {
    return Api().get('movie/' + movieId)
  },
  addMovie (credentials) {
    return Api().post('movie/add', credentials)
  },
  // profile
  addProfile (id, credentials) {
    return Api().post('profile?id=' + id, credentials, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getProfile (id) {
    return Api().get('profile?id=' + id, {
      responseType: 'arraybuffer'
    })
      .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  },
  // Schedules
  getScheduleByPlaza (plazaId, date) {
    return Api().get('plaza/' + plazaId + '/schedule?date=' + date)
  },
  getScheduleByMovie (movieId, date) {
    return Api().get('movie/' + movieId + '/schedule?date=' + date)
  },
  addSchedule (credentials) {
    return Api().post('schedule/add', credentials)
  }
}
