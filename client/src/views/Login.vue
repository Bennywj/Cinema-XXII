<template>
  <div align="center" class="p-5">
    <b-alert variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false" v-html="error">
    </b-alert>
    <b-card title="Login"
            tag="article"
            style="max-width: 20rem;">
      <div>
      <b-form @submit="login">
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
        password: ''
      },
      error: null,
      showDismissibleAlert: false
    }
  },
  methods: {
    async login () {
      var body = {
        email: this.form.email,
        password: this.form.password
      }
      try {
        const response = await AuthenthicationService.login(body)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.error = null
        this.$router.push('/')
      } catch (err) {
        this.showDismissibleAlert = true
        this.error = err.response.data.error
      }
    }
  }
}
</script>
