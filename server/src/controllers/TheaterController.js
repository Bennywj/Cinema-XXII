const {Theater} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');


module.exports = {
  async generateTheater (req, res) {
    try {
      var body = [];
      for(var i=1;i<=10;i++) {
        await Theater.create({theater_name:'Theater-'+i})
      }
      returnJsonResponse(res,{message:'10 Theaters are sucessfully added'})
    } catch(err) {
      returnJsonError(res,'server error',500)
    }
  },
  async getTheater (req, res) {
    try {
      const allTheater = await Theater.findAll()
      returnJsonResponse(res,{theaters:allTheater})
    } catch(err) {
      returnJsonError(res,'server error',500)
    }
  }
}
