<template>
  <div class="p-4">
    <b-row>
      <b-col>
        <b-row class="mt-3 mb-3">
          <div style="background-color:#C25219 ;width:100%;display:block;height:2px;"/>
        </b-row>
        <b-row>
          <b-col align="center">
            <div class="head">
              {{movie_name}}
            </div>
          </b-col>
        </b-row>
        <b-card
            tag="article">
          <b-row>
            <b-col align="center" v-if="movie" cols="5">
              <img :src="movie.image" style="height:450px;width:300px"/>
            </b-col>
            <b-col v-if="movie">
              <b-row>
                <b-col>
                  <b-button style="background-color:#663A2A;color:white" :to="{ name: 'movieSchedule', params: { id: movie.id } }">Buy Ticket</b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col cols="3">Release Date</b-col>:
                <b-col cols="8">{{movie_date}}</b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col cols="3">Cast Star</b-col>:
                <b-col cols="8">{{movie.cast_star}}</b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col cols="3">Genre</b-col>:
                <b-col cols="8">{{movie.genre_id}}</b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col cols="3">Director</b-col>:
                <b-col cols="8">{{movie.director}}</b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col cols="3">Producer</b-col>:
                <b-col cols="8">{{movie.producer}}</b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col cols="3">Length</b-col>:
                <b-col cols="8">{{movie.length}} Min</b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col>
                  <span style="color:#C25219"><b>Synopsis</b> </span>
                </b-col>
              </b-row>
              <b-row class="mt-3 mb-3">
                <b-col>
                  {{movie.description}}
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
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'MovieDetail',
  components: {
  },
  methods: {
    formatDate (dateString) {
      var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]
      var daysNames = [
        'Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday',
        'Saturday'
      ]
      var date = new Date(dateString)
      var day = date.getDate()
      var monthIndex = date.getMonth()
      var year = date.getFullYear()

      return daysNames[date.getDay()] + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year
    }
  },
  data () {
    return {
      movie: null,
      movie_id: this.$route.params.id,
      movie_name: null,
      movie_date: null
    }
  },
  async mounted () {
    const movieResponse = await AuthenthicationService.getMovieById(this.movie_id)
    var movieData = movieResponse.data.movie
    var image = null
    image = await AuthenthicationService.getProfile(movieData.name)
    image = 'data:image/jpg;base64,' + image
    movieData['image'] = image
    this.movie = movieData
    this.movie_name = movieData.name
    this.movie_date = this.formatDate(movieData.release_date)
  }
}
</script>
<style>
  .head {
    text-align: center;
    background-color: #C25219;
    padding: .5em;
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
