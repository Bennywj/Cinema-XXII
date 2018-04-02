const AuthenticationController = require('./controllers/AuthenticationController')
const GenreController = require('./controllers/GenreController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
  app.get('/genre',
    GenreController.getGenre)
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  app.post('/genre/add',
    GenreController.addGenre)
}
