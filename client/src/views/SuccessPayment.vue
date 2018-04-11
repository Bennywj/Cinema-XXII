<template>
  <div align="center" class="p-5">
    <b-card tag="article"
            style="max-width: 20rem;">
      <div>
        <img src="../img/success.png"/>
        <h3>Payment Successfull</h3>
        <p>Please check your email to get your booking code </p>
        <b-button variant="success" @click="back">back</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'SucessfulPayment',
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.push({name: 'dashboard'})
    }
  }
}
</script>
