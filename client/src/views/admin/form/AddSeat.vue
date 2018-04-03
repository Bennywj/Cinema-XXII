<template>
  <div class="p-4">
      <b-row>
          <b-col cols="2">
              <Sidebar/>
          </b-col>
          <b-col>
            <b-card title="Generate Seat"
                  tag="article"
                  style="max-width: 20rem;"
                  align="center">
              <b-form @submit="generateSeat">
                <b-container fluid>
                  <p v-html="seatStatus"></p>
                  <div v-if="!seatExist">
                    <b-button type="submit" variant="primary">Generate Seat</b-button>
                  </div>
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
  name: 'AddSeat',
  components: {
    Sidebar
  },
  data () {
    return {
      seatExist: false,
      seatStatus: ''
    }
  },
  methods: {
    async generateSeat () {
      try {
        await AuthenthicationService.generateSeat()
        this.seatStatus = 'Seats have been already generated'
        this.seatExist = true
      } catch (err) {
      }
    }
  },
  async mounted () {
    const seatObj = await AuthenthicationService.getSeat()
    if (seatObj.data.seats.length > 0) {
      this.seatExist = true
      this.seatStatus = 'Seats have been already generated'
    } else {
      this.seatExist = false
      this.seatStatus = 'Seats haven\'t been already generated'
    }
  }
}
</script>
