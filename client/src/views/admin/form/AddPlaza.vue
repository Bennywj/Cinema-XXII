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
            <b-card title="New Plaza"
                  tag="article"
                  style="max-width: 40rem;"
                  align="left">
              <b-form @submit="addPlaza">
                <b-container fluid>
                  <b-row class="mb-3 mt-4">
                    <b-col sm="3"><label :for="name">Name</label></b-col>
                    <b-col sm="9"><b-form-input :id="name" type="text" v-model="name" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="street">Street</label></b-col>
                    <b-col sm="9"><b-form-input :id="street" type="text" v-model="street" required></b-form-input></b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col sm="3"><label :for="phone">Phone</label></b-col>
                    <b-col sm="9"><b-form-input :id="phone" type="text" v-model="phone" required></b-form-input></b-col>
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
  name: 'AddPlaza',
  components: {
    Sidebar
  },
  data () {
    return {
      name: '',
      street: '',
      phone: '',
      file: null,
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  methods: {
    async addPlaza () {
      var body = {
        name: this.name,
        city: 'medan',
        street: this.street,
        phone_number: this.phone
      }
      try {
        await AuthenthicationService.addPlaza(body)
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
  }
}
</script>
