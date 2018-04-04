const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const GenreController = require('./controllers/GenreController')
const SeatController = require('./controllers/SeatController')
const TheaterController = require('./controllers/TheaterController')
const ProfileController = require('./controllers/ProfileController')
const PlazaController = require('./controllers/PlazaController')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  // genre
  app.get('/genre',
    GenreController.getGenre)
  app.post('/genre/add',
    GenreController.addGenre)
  // seat
  app.get('/seat',
    SeatController.getSeat)
  app.post('/seat/generate',
    SeatController.generateSeat)
  // theater
  app.get('/theater',
    TheaterController.getTheater)
  app.post('/theater/generate',
    TheaterController.generateTheater)
  // profile picture
  app.get('/profile/:id',
    ProfileController.getProfile)
  app.post('/profile/:id',
    ProfileController.uploadProfile)
  // plaza
  app.get('/plaza',
    PlazaController.getPlaza)
  app.post('/plaza/add',
    PlazaController.addPlaza)
}
