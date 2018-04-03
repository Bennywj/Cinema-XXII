const {Seat} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');


module.exports = {
  async generateSeat (req, res) {
    try {
      var body = [];
      for(var i=0;i<5;i++) {
        for(var j=1;j<=10;j++) {
          await Seat.create({seat_id:String.fromCharCode(97 + i)+j})
        }
      }
      returnJsonResponse(res,{message:'50 Seats are sucessfully added'})
    } catch(err) {
      returnJsonError(res,'server error',500)
    }
  },
  async getSeat (req, res) {
    try {
      const allSeat = await Seat.findAll()
      returnJsonResponse(res,{seats:allSeat})
    } catch(err) {
      returnJsonError(res,'server error',500)
    }
  }
}
