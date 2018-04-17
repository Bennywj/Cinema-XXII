const {Ticket, Schedule, User, Order,Movie,Plaza} = require('../models')

const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');
const nodemailer = require('nodemailer')

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
      
      const plazaObj = await Plaza.findOne({
        where: {
          id: scheduleObj.plaza_id
        }
      })
      
      const movieObj = await Movie.findOne({
        where: {
          id: scheduleObj.movie_id
        }
      })
      
      // the transcation is happens in here 
      User.update({point:userObj.point-scheduleObj.price*seats.length}, {
        where: {
          id: user_id
        } 
      })
      
      var uniqueId = makeid()
      for(var i=0;i<10;i++) {
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

      const orderBody = {
          user_id : user_id,
          order_id : uniqueId
        }
      await Order.create(orderBody)
      
      for(var i=0;i<seats.length;i++) {
        const body = {
          seat_no : seats[i],
          schedule_id: schedule_id,
          order_id: uniqueId
        }
        const ticketObj = await Ticket.create(body)
      }
      
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cinemaxxii1234@gmail.com', // generated ethereal user
            pass: 'APAkabar1234' // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });
  
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Cinema XXII" <admin@cinemaxxii.com>', // sender address
          to: userObj.email, // list of receivers
          subject: 'Order Confirmation', // Subject line
          html: `
            <p>  
              Thank you for choosing Cinema XXII. Your transaction has been processed successfully.
            </p>
            <p>
              Please show this email order confirmation to collect your tickets from the TIXX Counter
            </p>
            <b/>
            <h3 style='background-color:#C25219;color:white;text-align:center'>YOU ARE WATCHING</h3>
            <p>Booking Id  : `+uniqueId+`</p>
            <p>Movie Title : `+movieObj.name+`</p>
            <p>Cinema      : `+plazaObj.name+`</p>
          ` 
          // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              returnJsonError(res,error,400)
          }
          returnJsonResponse(res,{message:'your payment is successful'})
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      })
    } catch(err) {
      returnJsonError(res,'missing field user_id || schedule_id || seats',400)
    }
  }
}
