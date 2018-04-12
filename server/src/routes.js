const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const GenreController = require('./controllers/GenreController')
const TheaterController = require('./controllers/TheaterController')
const ProfileController = require('./controllers/ProfileController')
const PlazaController = require('./controllers/PlazaController')
const MovieController = require('./controllers/MovieController')
const ScheduleController = require('./controllers/ScheduleController')
const TicketController = require('./controllers/TicketController')
const VoucherController = require('./controllers/VoucherController')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
  app.get('/user/:id', 
    AuthenticationController.getUserById)
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  app.get('/user/:user_id/history',
    AuthenticationController.getUserHistory)
  // genre
  app.get('/genre',
    GenreController.getGenre)
  app.post('/genre/add',
    GenreController.addGenre)
  // theater
  app.get('/theater',
    TheaterController.getTheater)
  app.post('/theater/generate',
    TheaterController.generateTheater)
  // profile picture
  app.get('/profile?:id',
    ProfileController.getProfile)
  app.post('/profile?:id',
    ProfileController.uploadProfile)
  // plaza
  app.get('/plaza',
    PlazaController.getPlaza),
  app.get('/plaza/:id',
    PlazaController.getPlazaById)
  app.post('/plaza/add',
    PlazaController.addPlaza),
  // movies
  app.get('/movie',
    MovieController.getMovie)
  app.get('/movie/:id',
    MovieController.getMovieById)
  app.post('/movie/add',
    MovieController.addMovie)
  // schedule
  app.get('/movie/:movie_id/schedule?:date',
    ScheduleController.getScheduleByMovie)
  app.get('/plaza/:plaza_id/schedule?:date',
    ScheduleController.getScheduleByPlaza)
  app.post('/schedule/add',
    ScheduleController.addSchedule)
  app.get('/schedule/:id/tickets',
    ScheduleController.getScheduleTicket)
  app.get('/schedule/:id',
    ScheduleController.getScheduleById)
  // ticket
  app.post('/ticket',
    TicketController.buyTicket)
  // Voucher
  app.get('/voucher',
    VoucherController.getAllVoucher)
  app.post('/voucher/generate',
    VoucherController.generateVoucher)
  app.post('/voucher/redeem',
    VoucherController.redeemVoucher)
}
