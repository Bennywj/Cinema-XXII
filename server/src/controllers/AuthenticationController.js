const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');

function jwtSignUser (user) {
  return jwt.sign(user, config.authenthication.jwtSecret, {
    expiresIn: 60*60*24 //24 hours
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      var userJson = user.toJSON()
      delete userJson.password
      returnJsonResponse(res,{user:userJson})
    } catch(err) {
      returnJsonError(res,'This email has been used.',400)
    }
  },
    
  async login (req, res) {
    try {
      const {email,password} = req.body
      const userExist = await User.findOne({
        where: {
          email:email
        }
      })
      //if username not found
      if(!userExist) {
        returnJsonError(res,'Incorrect Email or Password.',403)
      }
      else {
        if(password === userExist.password) {
          
          var userJson = userExist.toJSON()
          
          //remove password attribute for security
          delete userJson.password
          
          let obj = {
            user: userJson,
            token: jwtSignUser(userJson)
          }
          
          returnJsonResponse(res,obj)
        }
        else {
          returnJsonError(res,'Incorrect Email or Password.',403)
        }
      }
    } catch(err) {
      returnJsonError(res,'missing field name or email or password.',403)
    }
  }
}
