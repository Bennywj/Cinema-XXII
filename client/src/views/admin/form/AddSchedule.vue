<template>
  <div class="p-4">
      <b-alert variant="danger"
             dismissible
             :show="showError"
             @dismissed="showError=false" v-html="error">
      </b-alert>
      <b-alert variant="success"
             dismissible
             :show="showSuccess"
             @dismissed="showSuccess=false" v-html="success">
      </b-alert>
      <b-row>
          <b-col cols="2">
              <Sidebar/>
          </b-col>
          <b-col align="center">
            <b-card title="New Schedule"
                  tag="article"
                  style="max-width: 40rem;"
                  align="left">
              <b-form @submit="addMovie">
                <b-container fluid>
                  <b-row class="mb-3 mt-4">
                    <b-col sm="3"><label :for="movie_id">Movie</label></b-col>
                    <b-col sm="9"><b-form-select v-model="movie_id" :options="movies" required/></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="plaza_id">Plaza</label></b-col>
                    <b-col sm="9"><b-form-select v-model="plaza_id" :options="plazas" required/></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="theater_id">Theater</label></b-col>
                    <b-col sm="9"><b-form-select v-model="theater_id" :options="theaters" required/></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="date">Date</label></b-col>
                    <b-col sm="9"><b-form-input :id="date" type="date" v-model="date" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="start_hour">Start Hour</label></b-col>
                    <b-col sm="9"><b-form-input :id="start_hour" type="time" v-model="start_hour" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="price">Price</label></b-col>
                    <b-col sm="9"><b-form-input :id="price" type="number" v-model="price" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="type">Type</label></b-col>
                    <b-col sm="9">
                      <b-form-select v-model="type">
                        <option value="2D">2D</option>
                        <option value="3D">3D</option>
                      </b-form-select>
                    </b-col>
                  </b-row>
                  <b-row class="pt-4" align="right">
                    <b-col >
                      <b-button type="submit" variant="primary">Submit</b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-form>
            </b-card>
          </b-col>
      </b-row>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'AddSchedule',
  components: {
    Sidebar
  },
  data () {
    return {
      movies: [],
      plazas: [],
      theaters: [],
      movie_id: null,
      plaza_id: null,
      theater_id: null,
      date: null,
      start_hour: null,
      price: null,
      type: '2D',
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  methods: {
    async addMovie () {
      var body = {
        movie_id: this.movie_id,
        plaza_id: this.plaza_id,
        theater_id: this.theater_id,
        date: this.date,
        start_hour: this.start_hour,
        price: this.price,
        type: this.type
      }
      try {
        await AuthenthicationService.addSchedule(body)
        this.movie_id = null
        this.plaza_id = null
        this.theater_id = null
        this.date = null
        this.start_hour = null
        this.price = null
        this.type = '2D'
        this.error = null
        this.showError = false
        this.success = 'Schedule is successfully added.'
        this.showSuccess = true
      } catch (err) {
        this.error = err.response.data.error
        this.showError = true
        this.success = null
        this.showSucess = false
      }
    }
  },
  async mounted () {
    // get all movie
    const movieObj = await AuthenthicationService.getMovie()
    const movieData = movieObj.data.movies
    for (var i = 0; i < movieData.length; i++) {
      this.movies.push({
        value: movieData[i].id,
        text: movieData[i].name
      })
    }
    // get all plaza
    const plazaObj = await AuthenthicationService.getPlaza()
    const plazaData = plazaObj.data.plazas
    for (i = 0; i < plazaData.length; i++) {
      this.plazas.push({
        value: plazaData[i].id,
        text: plazaData[i].name
      })
    }
    // get all theaters
    const theaterObj = await AuthenthicationService.getTheater()
    const theaterData = theaterObj.data.theaters
    for (i = 0; i < theaterData.length; i++) {
      this.theaters.push({
        value: theaterData[i].id,
        text: theaterData[i].name
      })
    }
  }
}
</script>
