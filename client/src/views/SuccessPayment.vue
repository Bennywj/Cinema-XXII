<template>
  <div align="center" class="p-5">
    <b-card tag="article"
            style="max-width: 20rem;">
      <div>
        <img src="../img/success.png"/>
        <h3>Payment Successfull</h3>
        <p>Please check your email at <b>{{$store.state.user.email}}</b> <br/>to get your booking code </p>
        <b-button variant="success" @click="back">back</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'SucessfulPayment',
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.push({name: 'dashboard'})
    }
  },
  async mounted () {
    const userResponse = await AuthenthicationService.getUserById(this.$store.state.user.id)
    this.$store.state.user.point = userResponse.data.user.point
  }
}
</script>
