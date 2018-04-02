const Joi = require('joi')
const { returnJsonError } = require('../controllers/GlobalController');

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      role: Joi.string(),
      point: Joi.number()
    }
    
    const {error, value} = Joi.validate(req.body, schema)
    
    if (error) {
      let errDetail = error.details[0].context.key 
      if (errDetail === "email") {
        returnJsonError(res,'You must provide a valid email address',403)
      }
      else {
        returnJsonError(res,'Missing field '+errDetail,400)
      }
    }
    else {
      next()
    }
  }
}