<template>
  <div align="center" class="p-5">
    <div>
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
    </div>
    <b-card title="Register"
            tag="article"
            style="max-width: 20rem;">
      <div>
      <b-form @submit="register">
        <b-form-group label="email" align="left">
          <b-form-input type="email"
                        v-model="form.email"
                        required
                        placeholder="email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="password" align="left">
          <b-form-input type="password"
                        v-model="form.password"
                        required
                        placeholder="Password">
          </b-form-input>
        </b-form-group>
        <b-form-group label="name" align="left">
          <b-form-input type="text"
                        v-model="form.name"
                        required
                        placeholder="Name">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    </b-card>
  </div>
</template>

<script>
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        name: ''
      },
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  methods: {
    async register () {
      var body = {
        email: this.form.email,
        password: this.form.password,
        name: this.form.name
      }
      try {
        await AuthenthicationService.register(body)
        this.error = null
        this.showError = false
        this.success = this.form.email + 'is successfully registered.'
        this.showSuccess = true
        this.form.email = ''
        this.form.password = ''
        this.form.name = ''
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
