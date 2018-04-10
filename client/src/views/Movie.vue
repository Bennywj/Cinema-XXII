<template>
  <div class="p-4">
    <b-row>
      <b-col cols="2" v-if="$store.state.user">
        <Sidebar v-if="$store.state.user['role'] == 'admin'"/>
      </b-col>
      <b-col>
        <b-row class="pb-3">
          <b-col>
            <h3>Movies</h3>
          </b-col>
          <div v-if="$store.state.user">
            <b-col align="right" v-if="$store.state.user['role'] == 'admin'">
              <b-button variant="success" :to="{ name: 'addMovie'}"><icon name="plus-circle" class="mr-3"></icon>Add Movie</b-button>
            </b-col>
          </div>
        </b-row>
        <b-card
            tag="article">
          <b-row>
            <b-col  class="mb-3" v-for="movie in movies" :key="movie.id" align="center">
              <router-link :to="{ name: 'movieSchedule', params: { id: movie.id } }">
                <img :src="movie.image" style="height:300px;width:193px"/>
              </router-link>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'Movie',
  components: {
    Sidebar
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  data () {
    return {
      movies: []
    }
  },
  async mounted () {
    const movieObj = await AuthenthicationService.getMovie()
    const moviesData = movieObj.data.movies
    for (var i = 0; i < moviesData.length; i++) {
      var image = null
      try {
        image = await AuthenthicationService.getProfile(moviesData[i].name)
        image = 'data:image/jpg;base64,' + image
      } catch (err) {
      }
      var obj = moviesData[i]
      obj['image'] = image
      this.movies.push(obj)
    }
  }
}
</script>
