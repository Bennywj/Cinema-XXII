const {Profile_Picture} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+
    path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('profileImage')

module.exports = {
  
  async getProfile(req,res) {
    const { id } = req.query;
    if(!id) {
      returnJsonError(res,'missing query id',403)
    }
    const userExist = await Profile_Picture.findOne({
      where: {
        username:id
      }
    })
    if(userExist) {
      res.sendFile(path.join(__dirname, '../../uploads', userExist.file_name));
    }
    else {
      returnJsonError(res,'user '+id+' not found in our server',403)
    }
  },
  
  async uploadProfile (req, res) {
    const { id } = req.query;
    if(!id) {
      returnJsonError(res,'missing query id',403)
    }
    const userExist = await Profile_Picture.findOne({
      where: {
        username:id
      }
    })
    upload(req, res, (err) => {
      try {
        if(userExist) {
          Profile_Picture.update({file_name:req.file.filename }, {
            where: {
              username: id
            } 
          })
        }
        else {
          const body = {
            username: id,
            file_name: req.file.filename
          }
          Profile_Picture.create(body)
        }
        returnJsonResponse(res,{message: "Profile Image successfully update"})
      } catch(err) {
        returnJsonError(res,'server error.',403)
      }
    })
  }
}
