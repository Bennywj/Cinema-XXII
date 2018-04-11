<template>
  <div class="p-4">
    <b-row>
      <b-col>
        <b-row class="pb-3">
          <b-col>
            <h3>{{movie_name}}'s Schedule</h3>
          </b-col>
        </b-row>
        <b-form @submit="filterSchedule">
          <b-row class="pb-3">
            <b-col class="col-3">
              <b-form-input :id="date" type="date" v-model="date" required/>
            </b-col>
            <b-col>
              <b-button variant="info" type="submit"><icon name="search" class="mr-3"></icon>Filter</b-button>
            </b-col>
          </b-row>
        </b-form>
        <b-row class="mt-3 mb-3">
          <div style="background-color:#C25219 ;width:100%;display:block;height:2px;"/>
        </b-row>
        <b-row>
          <b-col align="center">
            <div class="head">
              PLAZAS
            </div>
          </b-col>
          <b-col align="center">
            <div class="head">
              SHOWTIME
            </div>
          </b-col>
        </b-row>
        <b-card
            tag="article" class="mb-3"
             v-for="plaza in plazas" :key="plaza.id">
          <b-row>
            <b-col>
              <b class="titleMovie">{{plaza.name}}</b>
            </b-col>
            <b-col>
              <b-row>
                <b-col v-for="schedule in plaza.schedules" :key="schedule.id">
                  <div class="showtime p-2 m-1" align="center">
                    <router-link :to="{ name: 'seatSelection', params: { id: schedule.id } }" style="color:white;text-decoration:none">
                      <b>
                      {{schedule.start_hour}} ({{schedule.type}})
                      Rp {{schedule.price}}
                      </b>
                    </router-link>
                  </div>
                </b-col>
              </b-row>
            </b-col>
        </b-row>
        </b-card>
      </b-col>
    </b-row>
    </div>
</template>

<script>
import CustomDate from '@/extensions/CustomDate'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'MovieSchedule',
  components: {
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async filterSchedule () {
      const response = await AuthenthicationService.getScheduleByMovie(this.movie_id, this.date)
      this.plazas = response.data.plazas
    }
  },
  data () {
    return {
      date: null,
      movie: null,
      movie_id: this.$route.params.id,
      movie_name: null,
      plazas: []
    }
  },
  async mounted () {
    this.date = CustomDate.getTodayDate()
    const plazaResponse = await AuthenthicationService.getScheduleByMovie(this.movie_id, this.date)
    const movieResponse = await AuthenthicationService.getMovieById(this.movie_id)
    this.plazas = plazaResponse.data.plazas
    this.movie = movieResponse.data.movies
    this.movie_name = movieResponse.data.movie.name
  }
}
</script>
<style>
  .head {
    text-align: center;
    background-color: #663A2A;
    padding: .2em;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
  }
  .titleMovie {
    color: #008FBE;
  }
  .showtime {
    color:white;
    background-color: #008FBE;
    height:60px;
    width:110px;
    cursor:pointer
  }
</style>
