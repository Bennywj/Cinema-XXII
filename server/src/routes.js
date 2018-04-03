const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const GenreController = require('./controllers/GenreController')
const SeatController = require('./controllers/SeatController')

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
    SeatController.addSeat)
}
