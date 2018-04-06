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
            <b-card title="New Movie"
                  tag="article"
                  style="max-width: 40rem;"
                  align="left">
              <b-form @submit="addMovie">
                <b-container fluid>
                  <b-row class="mb-3 mt-4">
                    <b-col sm="3"><label :for="name">Name</label></b-col>
                    <b-col sm="9"><b-form-input :id="name" type="text" v-model="name" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="genre">Genre</label></b-col>
                    <b-col sm="9"><b-form-select v-model="genre" :options="genres"/></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="cast_star">Cast Star</label></b-col>
                    <b-col sm="9"><b-form-input :id="cast_star" type="text" v-model="cast_star" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="length">Length</label></b-col>
                    <b-col sm="9"><b-form-input :id="length" type="number" v-model="length" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="release_date">Release Date</label></b-col>
                    <b-col sm="9"><b-form-input :id="release_date" type="date" v-model="release_date" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3 mt-4">
                    <b-col sm="3"><label :for="director">Director</label></b-col>
                    <b-col sm="9"><b-form-input :id="director" type="text" v-model="director" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3 mt-4">
                    <b-col sm="3"><label :for="producer">Producer</label></b-col>
                    <b-col sm="9"><b-form-input :id="producer" type="text" v-model="producer" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="file">Image</label></b-col>
                    <b-col sm="9">
                      <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a image..." required></b-form-file>
                    </b-col>
                  </b-row>
                  <b-row class="mb-3 mt-4">
                    <b-col sm="3"><label :for="description">Description</label></b-col>
                    <b-col sm="9">
                      <b-form-textarea id="description"
                         v-model="description"
                         placeholder="Enter something"
                         :rows="3"
                         :max-rows="6"
                         required>
                      </b-form-textarea>
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
  name: 'AddMovie',
  components: {
    Sidebar
  },
  data () {
    return {
      name: '',
      genre: '',
      cast_star: '',
      length: '',
      release_date: null,
      director: '',
      producer: '',
      description: '',
      file: null,
      error: null,
      showError: false,
      success: null,
      showSuccess: false,
      genres: []
    }
  },
  methods: {
    async addMovie () {
      var body = {
        name: this.name,
        genre_id: this.genre,
        cast_star: this.cast_star,
        length: this.length,
        release_date: this.release_date,
        director: this.director,
        producer: this.producer,
        description: this.description
      }
      console.log(body)
      try {
        await AuthenthicationService.addMovie(body)
        if (this.file != null) {
          const formData = new FormData()
          formData.append('profileImage', this.file)
          await AuthenthicationService.addProfile(this.name, formData)
        }
        this.error = null
        this.showError = false
        this.success = this.name + ' is successfully added.'
        this.showSuccess = true
        this.name = ''
        this.genre = ''
        this.cast_star = ''
        this.length = ''
        this.release_date = null
        this.director = ''
        this.producer = ''
        this.description = ''
        this.file = null
      } catch (err) {
        console.log(err)
        this.error = err.response.data.error
        this.showError = true
        this.success = null
        this.showSucess = false
      }
    }
  },
  async mounted () {
    const genreObj = await AuthenthicationService.getGenre()
    const genreData = genreObj.data.genres
    for (var i = 0; i < genreData.length; i++) {
      this.genres.push({
        value: genreData[i].id,
        text: genreData[i].name
      })
    }
  }
}
</script>
