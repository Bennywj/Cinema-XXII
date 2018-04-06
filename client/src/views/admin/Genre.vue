<template>
  <div class="p-4">
      <b-row>
          <b-col cols="2">
              <Sidebar/>
          </b-col>
          <b-col>
              <b-row class="pb-3">
                <b-col>
                  <h3>Genres</h3>
                </b-col>
                <b-col align="right">
                  <b-button variant="success" :to="{ name: 'addGenre'}"><icon name="plus-circle" class="mr-3"></icon>Add Genre</b-button>
                </b-col>
              </b-row>
              <b-table bordered striped hover :items="items" :fields="fields"></b-table>
          </b-col>
      </b-row>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'Genre',
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
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [ 'no', 'name' ],
      items: []
    }
  },
  async mounted () {
    const genres = await AuthenthicationService.getGenre()
    const genreData = genres.data.genres
    for (var i = 0; i < genreData.length; i++) {
      this.items.push({
        no: i + 1,
        name: genreData[i].name
      })
    }
  }
}
</script>
