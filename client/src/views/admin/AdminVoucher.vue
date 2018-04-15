<template>
  <div class="p-4">
      <b-row>
          <b-col cols="2">
              <Sidebar/>
          </b-col>
          <b-col>
              <b-row class="pb-3">
                <b-col>
                  <h3>Voucher</h3>
                </b-col>
                <b-col align="right">
                  <div>
                    <b-form inline  @submit="generateVoucher">
                      <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
                      <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input type="number"
                          v-model="point"
                          required
                          placeholder="enter any points"/>
                      </b-input-group>
                      <b-button variant="success" type="submit">Generate Voucher</b-button>
                    </b-form>
                  </div>
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
    async generateVoucher () {
      await AuthenthicationService.generateVoucher({point: this.point})
      const vouchers = await AuthenthicationService.getVoucher()
      const vouchersData = vouchers.data.vouchers
      this.items = []
      this.point = null
      for (var i = 0; i < vouchersData.length; i++) {
        this.items.push({
          no: i + 1,
          voucher_code: vouchersData[i].voucher_code,
          point: vouchersData[i].point
        })
      }
      this.$forceUpdate()
    }
  },
  data () {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [ 'no', 'voucher_code', 'point' ],
      items: [],
      point: null
    }
  },
  async mounted () {
    const vouchers = await AuthenthicationService.getVoucher()
    const vouchersData = vouchers.data.vouchers
    for (var i = 0; i < vouchersData.length; i++) {
      this.items.push({
        no: i + 1,
        voucher_code: vouchersData[i].voucher_code,
        point: vouchersData[i].point
      })
    }
  }
}
</script>
