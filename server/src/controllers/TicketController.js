const {Ticket} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');


module.exports = {
  async buyTicket (req, res) {
    try {
      const {user_id} = req.body
      const {schedule_id} = req.body
      const {seats} = req.body
      for(var i=0;i<seats.length;i++) {
        const body = {
          seat_no : seats[i],
          schedule_id: schedule_id
        }
        const ticketObj = await Ticket.create(body)
      }
      returnJsonResponse(res,{message:'your payment is successful'})
    } catch(err) {
      returnJsonError(res,'missing field user_id || schedule_id || seats',400)
    }
  }
}
