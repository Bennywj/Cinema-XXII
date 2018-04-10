const {Schedule} = require('../models')
const {Movie} = require('../models')
const {Plaza} = require('../models')
const { returnJsonError } = require('../controllers/GlobalController');
const { returnJsonResponse } = require('../controllers/GlobalController');

function sortByStartHour(a,b) {
  return a.start_hour > b.start_hour
}

module.exports = {
  async addSchedule (req, res) {
    try {
      const schedule = await Schedule.create(req.body)
      returnJsonResponse(res,{message: 'Schedules is successfully added'})
    } catch(err) {
      returnJsonError(res,'missing field name or genre_id or description or cast_star or length or release_date or director or producer',400)
    }
  },
    
  async getScheduleByPlaza (req, res) {
    const { plaza_id } = req.params
    const { date } = req.query
    try {
      const filterSchedule = await Schedule.findAll({
        where: {
          date:date,
          plaza_id: plaza_id
        }
      })
      var allSchedule = {
        movies: [] 
      }
      for(var i = 0; i<filterSchedule.length; i++) {
        //to find movie by id, to make it distinct in json
        var movieIndex = allSchedule.movies.findIndex(x => x.id==filterSchedule[i].movie_id)
        
        if(movieIndex == -1) {
          var distinctMovie = await Movie.findOne({
            where: {
              id: filterSchedule[i].movie_id
            }
          })
          distinctMovie= distinctMovie.toJSON()
          distinctMovie["schedules"] = []
          allSchedule.movies.push(distinctMovie)
          movieIndex = allSchedule.movies.length-1;
        }
        
        allSchedule.movies[movieIndex].schedules.push({
          id:filterSchedule[i].id,
          start_hour: filterSchedule[i].start_hour.substr(0,5),
          price: filterSchedule[i].price,
          type: filterSchedule[i].type
        })
      }
      for(i = 0; i<allSchedule.movies.length; i++) {
        allSchedule.movies[i].schedules.sort(sortByStartHour)
      }
      returnJsonResponse(res,allSchedule)
    } catch(err) {
      returnJsonError(res,'server error.',400)
    }
  },
    
  async getScheduleByMovie (req, res) {
    const { movie_id } = req.params
    const { date } = req.query
    try {
      const filterSchedule = await Schedule.findAll({
        where: {
          date:date,
          movie_id: movie_id
        }
      })
      
      var allSchedule = {
        plazas: [] 
      }
      
      for(var i = 0; i<filterSchedule.length; i++) {
        //to find movie by id, to make it distinct in json
        var plazaIndex = allSchedule.plazas.findIndex(x => x.id==filterSchedule[i].plaza_id)
        
        if(plazaIndex == -1) {
          var distinctPlaza = await Plaza.findOne({
            where: {
              id: filterSchedule[i].plaza_id
            }
          })
          distinctPlaza= distinctPlaza.toJSON()
          distinctPlaza["schedules"] = []
          allSchedule.plazas.push(distinctPlaza)
          plazaIndex = allSchedule.plazas.length-1;
        }
        
        allSchedule.plazas[plazaIndex].schedules.push({
          id:filterSchedule[i].id,
          start_hour: filterSchedule[i].start_hour.substr(0,5),
          price: filterSchedule[i].price,
          type: filterSchedule[i].type
        })
      }
      for(i = 0; i<allSchedule.plazas.length; i++) {
        allSchedule.plazas[i].schedules.sort(sortByStartHour)
      }
      returnJsonResponse(res,allSchedule)
    } catch(err) {
      returnJsonError(res,'server error.',400)
    }
  }
}
