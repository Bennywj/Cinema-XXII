const {User,Voucher} = require('../models')
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
  async generateVoucher (req, res) {
    try {
      const {point} = req.body
      var voucherCode = makeid()
      for(var i=0;i<100;i++) {
        const voucherCodeExist = await Voucher.findOne({
          where : {
            voucher_code : voucherCode
          }
        })
        if(!voucherCodeExist) {
          break;
        }
        voucherCode = makeid()
      }
      var body = {
        voucher_code : voucherCode,
        point : point
      }
      const newVoucher = await Voucher.create(body)
      returnJsonResponse(res,newVoucher)
    res.send(voucherCode)
    } catch(err) {
      returnJsonError(res,'missing point field',403)
    }
  },
  async getAllVoucher (req, res) {
    try {
      const allVoucher = await Voucher.findAll({
        where : {
          used : false
        }
      })
      returnJsonResponse(res,{vouchers:allVoucher})
    } catch(err) {
      returnJsonError(res,'server error', 500)
    }
  },
  async redeemVoucher (req, res) {
    try {
      const {user_id, voucher_code} = req.body
      const voucher = await Voucher.findOne({
        where : {
          voucher_code : voucher_code
        }
      })
      if(!voucher) {
        returnJsonError(res,'incorrect voucher code', 403)
      }
      else if(voucher.used == true) {
        returnJsonError(res,'voucher has been used', 403)
      }
      
      const user = await User.findOne({
        where : {
          id: user_id
        }
      })
      if(!user) {
        returnJsonError(res,"account isn't exist", 403)
      }
      
      await User.update({point:user.point+voucher.point }, {
        where: {
          id: user_id
        } 
      })
      
      await Voucher.update({used:true }, {
        where: {
          voucher_code: voucher_code
        } 
      })
      
      await Voucher.update({point:0 }, {
        where: {
          voucher_code: voucher_code
        } 
      })
      
      returnJsonResponse(res,{message: "Your voucher has been redeemed successfully"})
    } catch(err) {
      returnJsonError(res,'missing field user_id || voucher_code', 403)
    }
  } 
}
