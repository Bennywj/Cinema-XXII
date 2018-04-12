const {User, Order, Ticket, Schedule, Movie} = require('../models')
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
  },
  async getUserHistory (req, res) {
    try {
      const {user_id} = req.params
      const orderHistory = await Order.findAll({
        where: {
          user_id:user_id
        }
      })
      //if username not found
      if(orderHistory.length == 0) {
        returnJsonError(res,"history isn't exist",403)
      }
      else {
        var allHistory = {
          orders: [] 
        }

        for(var i = 0; i<orderHistory.length; i++) {
          //to find history by id, to make it distinct in json
          var historyIndex = allHistory.orders.findIndex(x => x.order_id==orderHistory[i].order_id)
          const ticketOrder = await Ticket.findOne({
            where: {
              id: orderHistory[i].ticket_id
            }
          })
          if(historyIndex == -1) {
            const scheduleById = await Schedule.findOne({
              where: {
                id:ticketOrder.schedule_id
              }
            })
            
            var scheduleJson = scheduleById.toJSON()
            scheduleJson["movie"] = await Movie.findOne({
              where: {
                id: scheduleJson.movie_id
              }
            })
            var body = {
                movie_name : scheduleJson.movie.name,
                start_hour : scheduleJson.start_hour,
                date : scheduleJson.date,
                price : scheduleJson.price,
                order_id : orderHistory[i].order_id,
                seats : []
            }
            allHistory.orders.push(body)
            historyIndex = allHistory.orders.length-1
          }
          allHistory.orders[historyIndex].seats.push(ticketOrder.seat_no)
        }
        res.send(allHistory)
      }
    } catch(err) {
      returnJsonError(res,'missing id field',403)
    }
  }
}
