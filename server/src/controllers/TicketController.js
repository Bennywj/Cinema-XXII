const {Ticket, Schedule, User, Order} = require('../models')

const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


module.exports = {
  async buyTicket (req, res) {
    try {
      
      const {schedule_id} = req.body
      const {seats} = req.body
      const {user_id} = req.body
      
      const userObj = await User.findOne({
        where: {
          id: user_id
        }
      })
      
      const scheduleObj = await Schedule.findOne({
        where: {
          id: schedule_id
        }
      })
      
      // the transcation is happens in here 
      User.update({point:userObj.point-scheduleObj.price*seats.length}, {
        where: {
          id: user_id
        } 
      })
      
      var uniqueId = makeid()
      for(var i=0;i<100;i++) {
        var uniqueOrderId = await Order.findOne({
          where: {
            order_id: uniqueId
          }
        })
        if(!uniqueOrderId) {
          break;
        }
        uniqueId = makeid()
      }
      
      for(var i=0;i<seats.length;i++) {
        const body = {
          seat_no : seats[i],
          schedule_id: schedule_id
        }
        const ticketObj = await Ticket.create(body)
        const orderBody = {
          user_id : user_id,
          order_id : uniqueId,
          ticket_id : ticketObj.id
        }
        await Order.create(orderBody)
      }
      returnJsonResponse(res,{message:'your payment is successful'})
    } catch(err) {
      returnJsonError(res,'missing field user_id || schedule_id || seats',400)
    }
  }
}
