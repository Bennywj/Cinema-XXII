const {Movie} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');


module.exports = {
  async addMovie (req, res) {
    try {
      const {name} = req.body
      const movieExist = await Movie.findOne({
        where: {
          name: name
        }
      })
      if(movieExist) {
        returnJsonError(res,name + ' is already exists.',403)
      }
      else {
        const movie = await Movie.create(req.body)
        returnJsonResponse(res,{message: name + ' is successfully added'})
      }
      
    } catch(err) {
      returnJsonError(res,'missing field name or genre_id or description or cast_star or length or release_date or director or producer',400)
    }
  },
  async getMovie (req, res) {
    try {
      const allMovie = await Movie.findAll()
      returnJsonResponse(res,{movies:allMovie})
    } catch(err) {
      returnJsonError(res,'server error.',400)
    }
  },
  async getMovieById (req, res) {
    const { id } = req.params;
    try {
      const movieById = await Movie.findOne({
        where: {
          id:id
        }
      })
      if  (movieById) {
        returnJsonResponse(res,{movie:movieById})
      }
      else {
        returnJsonError(res,'Movie with id ' + id + ' not found in our server !!',403)
      }
    } catch(err) {
      returnJsonError(res,'server error.',500)
    }
  } 
}
