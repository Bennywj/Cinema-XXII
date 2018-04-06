const {Genre} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');


module.exports = {
  async addGenre (req, res) {
    try {
      const {name} = req.body
      const genreExist = await Genre.findOne({
        where: {
          name: name
        }
      })
      if(genreExist) {
        returnJsonError(res,'Genre ' + name + ' already exists.',403)
      }
      else {
        const genreObj = await Genre.create(req.body)
        returnJsonResponse(res,{message: name + ' successfully added'})
      }
    } catch(err) {
      returnJsonError(res,'missing field name.',400)
    }
  },
  async getGenre (req, res) {
    try {
      const allGenre = await Genre.findAll()
      returnJsonResponse(res,{genres:allGenre})
    } catch(err) {
      returnJsonError(res,'server error.',400)
    }
  }
}
