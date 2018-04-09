<template>
  <div class="p-4">
    <b-row>
      <b-col cols="2">
        <Sidebar/>
      </b-col>
      <b-col>
        <b-row class="pb-3">
          <b-col>
            <h3>Schedule</h3>
          </b-col>
          <b-col align="right">
            <b-button variant="success" :to="{ name: 'addSchedule'}"><icon name="plus-circle" class="mr-3"></icon>Add Schedule</b-button>
          </b-col>
        </b-row>
        <b-form @submit="filterSchedule">
          <b-row class="pb-3">
            <b-col>
              <b-form-input :id="date" type="date" v-model="date" required/>
            </b-col>
            <b-col>
              <b-form-select v-model="plaza_id" :options="plazas" required/>
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
              MOVIES
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
             v-for="movie in movies" :key="movie.id">
          <b-row>
            <b-col>
              <b class="titleMovie">{{movie.name}}</b>
            </b-col>
            <b-col>
              <b-row>
                <b-col v-for="schedule in movie.schedules" :key="schedule.id">
                  <div class="showtime p-2 m-1" align="center">
                    <b>
                    {{schedule.start_hour}} ({{schedule.type}})
                    Rp {{schedule.price}}
                    </b>
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
import Sidebar from '@/components/Sidebar.vue'
import CustomDate from '@/extensions/CustomDate'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'Schedule',
  components: {
    Sidebar
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async filterSchedule () {
      const response = await AuthenthicationService.getScheduleByPlaza(this.plaza_id, this.date)
      this.movies = response.data.movies
    }
  },
  data () {
    return {
      date: null,
      plazas: [],
      plaza_id: null,
      movies: []
    }
  },
  async mounted () {
    // get all plaza
    this.date = CustomDate.getTodayDate()
    this.plazas.push({
      value: null,
      text: 'Please Select a Plaza'
    })
    const plazaObj = await AuthenthicationService.getPlaza()
    const plazaData = plazaObj.data.plazas
    for (var i = 0; i < plazaData.length; i++) {
      this.plazas.push({
        value: plazaData[i].id,
        text: plazaData[i].name
      })
    }
    if (plazaData.length > 0) {
      const response = await AuthenthicationService.getScheduleByPlaza(plazaData[0].id, this.date)
      this.movies = response.data.movies
      this.plaza_id = plazaData[0].id
    }
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
    cursor:pointer
  }
  .showtime {
    color:white;
    background-color: #008FBE;
    height:60px;
    width:110px;
    cursor:pointer
  }
</style>
