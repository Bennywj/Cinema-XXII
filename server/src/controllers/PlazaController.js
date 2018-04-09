const {Plaza} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');


module.exports = {
  async addPlaza (req, res) {
    try {
      const {name} = req.body
      const plazaExist = await Plaza.findOne({
        where: {
          name: name
        }
      })
      if(plazaExist) {
        returnJsonError(res,name + ' is already exists.',403)
      }
      else {
        const plaza = await Plaza.create(req.body)
        returnJsonResponse(res,{message: name + ' is successfully added'})
      }
      
    } catch(err) {
      returnJsonError(res,'missing field name or city or street or phone_number',403)
    }
  },
  async getPlaza (req, res) {
    try {
      const allPlaza = await Plaza.findAll()
      returnJsonResponse(res,{plazas:allPlaza})
    } catch(err) {
      returnJsonError(res,'server error.',400)
    }
  },
  async getPlazaById (req, res) {
    const { id } = req.params;
    try {
      const plazaById = await Plaza.findOne({
        where: {
          id:id
        }
      })
      if  (plazaById) {
        returnJsonResponse(res,{plaza:plazaById})
      }
      else {
        returnJsonError(res,'Plaza with id ' + id + ' not found in our server !!',403)
      }
    } catch(err) {
      returnJsonError(res,'server error.',500)
    }
  } 
}
