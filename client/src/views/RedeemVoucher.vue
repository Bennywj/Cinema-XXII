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
    <b-card title="Redeem Voucher"
            tag="article"
            style="max-width: 20rem;">
      <div>
      <b-form @submit="redeemVoucher">
        <b-form-group label=" " align="left">
          <b-form-input type="text"
                        v-model="form.voucher_code"
                        required
                        placeholder="enter your voucher code">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Redeem</b-button>
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
        voucher_code: ''
      },
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  methods: {
    async redeemVoucher () {
      if (!this.$store.state.isUserLoggedIn) {
        return 0
      }
      var body = {
        user_id: this.$store.state.user.id,
        voucher_code: this.form.voucher_code
      }
      try {
        await AuthenthicationService.redeemVoucher(body)
        this.error = null
        this.showError = false
        this.success = 'Your voucher has been redeemed successfully'
        this.showSuccess = true
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
