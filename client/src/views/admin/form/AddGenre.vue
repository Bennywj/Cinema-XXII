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
            <b-card title="New Genre"
                  tag="article"
                  style="max-width: 40rem;"
                  align="left">
              <b-form @submit="addGenre">
                <b-container fluid>
                  <b-row class="mt-4">
                    <b-col sm="3"><label :for="name">Name</label></b-col>
                    <b-col sm="9"><b-form-input :id="name" type="text" v-model="name" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="pt-4" align="right">
                    <b-col>
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
  name: 'AddGenre',
  components: {
    Sidebar
  },
  data () {
    return {
      name: '',
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  methods: {
    async addGenre () {
      var body = {
        genre_name: this.name
      }
      try {
        await AuthenthicationService.addGenre(body)
        this.error = null
        this.showError = false
        this.success = this.name + ' is successfully added.'
        this.showSuccess = true
        this.name = ''
      } catch (err) {
        this.error = err.response.data.error
        this.showError = true
        this.success = null
        this.showSucess = false
      }
    }
  }
}
</script>
