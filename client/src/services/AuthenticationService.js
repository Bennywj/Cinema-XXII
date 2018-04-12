import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  getUserById (userId) {
    return Api().get('/user/' + userId)
  },
  getUserHistory (userId) {
    return Api().get('/user/' + userId + '/history')
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
  getScheduleTickets (scheduleId) {
    return Api().get('schedule/' + scheduleId + '/tickets')
  },
  getScheduleById (scheduleId) {
    return Api().get('schedule/' + scheduleId)
  },
  addSchedule (credentials) {
    return Api().post('schedule/add', credentials)
  },
  // tickets
  buyTicket (credentials) {
    return Api().post('/ticket', credentials)
  },
  // Voucher
  getVoucher () {
    return Api().get('/voucher')
  },
  generateVoucher (credentials) {
    return Api().post('/voucher/generate', credentials)
  },
  redeemVoucher (credentials) {
    return Api().post('/voucher/redeem', credentials)
  }
}
