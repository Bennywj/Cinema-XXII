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
            <b-card title="Edit Profile"
                  tag="article"
                  style="max-width: 40rem;"
                  align="left">
              <b-form @submit="updateProfile">
                <b-container fluid>
                  <b-row class="mb-3 mt-4">
                    <b-col sm="3"><label :for="name">Name</label></b-col>
                    <b-col sm="9"><b-form-select v-model="name" :options="names"/></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="file">Image</label></b-col>
                    <b-col sm="9">
                      <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a image..." required></b-form-file>
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
  name: 'EditProfile',
  components: {
    Sidebar
  },
  data () {
    return {
      names: [],
      name: '',
      file: null,
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  methods: {
    async updateProfile () {
      try {
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
        this.street = ''
        this.phone = ''
        this.file = null
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
      this.names.push(movieData[i].name)
    }
    // get all plaza
    const plazaObj = await AuthenthicationService.getPlaza()
    const plazaData = plazaObj.data.plazas
    for (i = 0; i < plazaData.length; i++) {
      this.names.push(plazaData[i].name)
    }
    console.log(this.names)
  }
}
</script>
