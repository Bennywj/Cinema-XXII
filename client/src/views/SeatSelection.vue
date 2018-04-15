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
      <b-col>
        <b-row class="pb-3">
          <b-col>
            <h3>Seat Selection</h3>
          </b-col>
        </b-row>
        <b-card
            tag="article" class="mb-3">
          <b-row align="center" class="mb-3">
            <b-col>
              <img src="../img/selectedSeat.gif">
              <span>Selected</span>
            </b-col>
            <b-col>
              <img src="../img/unselectedSeat.gif">
              <span>Available</span>
            </b-col>
            <b-col>
              <img src="../img/takenSeat.gif">
              <span>Taken</span>
            </b-col>
          </b-row>
          <b-row>
            <table align="center">
              <tr>
                <td v-for="i in 11" :key="i">
                  <span class="ml-2" style="font-size:12px" v-if="i != 1">
                    {{i-1}}
                  </span>
                </td>
              </tr>
              <tr v-for="i in 10" :key="i">
                <span class="m-1" style="font-size:11px">
                  {{String.fromCharCode(64 + i)}}
                </span>
                <td v-for="j in 10" @click="selectSeat(i,j)" :key="j">
                  <img src="../img/unselectedSeat.gif" class="m-1" v-if="seats[i-1][j-1] === 0"/>
                  <img src="../img/selectedSeat.gif" class="m-1" v-if="seats[i-1][j-1] === 1"/>
                  <img src="../img/takenSeat.gif" class="m-1" v-if="seats[i-1][j-1] === 2"/>
                  <span v-if="j == 5">
                    &nbsp;
                  </span>
                </td>
              </tr>
            </table>
          </b-row>
          <b-row class="mt-3">
            <b-col align="center">
              <p>SCREEN</p>
              <img src="../img/movieScreen.gif"/>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card header="YOU ARE WATCHING"
                header-tag="header">
          <b-row class="mb-2">
            <b-col cols="4">
              Movie Title
            </b-col>:
            <b-col v-if="schedule">
              {{schedule["movie"]["name"]}}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              Cinema
            </b-col>:
            <b-col v-if="schedule">
              {{schedule["plaza"]["name"]}}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              Showtime
            </b-col>:
            <b-col>
              {{showHour}} {{showDate}}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              Format
            </b-col>:
            <b-col v-if="schedule">
              Cinemaxx Regular | {{schedule["type"]}}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              Cinema No
            </b-col>:
            <b-col v-if="schedule">
               {{schedule["theater"]["name"]}}
            </b-col>
          </b-row>
        </b-card>
        <b-card header="YOUR ORDER"
                header-tag="header"
                class="mt-3">
          <b-row class="mb-2">
            <b-col cols="4">
              Total Seat(s)
            </b-col>:
            <b-col>
              {{total_seat}}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              Price per Ticket
            </b-col>:
            <b-col v-if="schedule">
               Rp. {{schedule["price"]}}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              Booking Fee
            </b-col>:
            <b-col>
              Rp. 10.000
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="4">
              <b>Total Price</b>
            </b-col>:
            <b-col v-if="schedule">
              <b>{{schedule["price"]*total_seat}}</b>
            </b-col>
          </b-row>
        </b-card>
        <div>
          <b-button variant="success" class="mt-3" :to="{ name: 'login'}" v-if="!this.$store.state.isUserLoggedIn">
            PROCEED TO PAYMENT
          </b-button>
          <b-button variant="success" class="mt-3" v-b-modal.modal-center v-if="this.$store.state.isUserLoggedIn">
            PROCEED TO PAYMENT
          </b-button>
          <!-- Modal Component -->
          <b-modal id="modal-center" centered @ok=payment>
            <b-card
                class="mt-3"
                header="PAYMENT DETAIL"
                header-tag="header">
              <b-row class="mb-2">
                <b-col cols="4">
                  Total Seat(s)
                </b-col>:
                <b-col>
                  {{total_seat}}
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4">
                  Price per Ticket
                </b-col>:
                <b-col v-if="schedule">
                   Rp. {{schedule["price"]}}
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4">
                  Booking Fee
                </b-col>:
                <b-col>
                  Rp. 10000
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4">
                  <b>Your Balance</b>
                </b-col>:
                <b-col v-if="schedule">
                  <b>Rp. {{userCurrentPoint}}</b>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4">
                  <b>Total Price</b>
                </b-col>:
                <b-col v-if="schedule">
                  <b >Rp. {{schedule["price"]*total_seat+10000}}</b>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4">
                  <b>Remain</b>
                </b-col>:
                <b-col v-if="schedule">
                  <b v-if="userCurrentPoint - (schedule['price']*total_seat + 10000) >= 0">Rp. {{userCurrentPoint - (schedule["price"]*total_seat+10000)}}</b>
                  <b style="color:red" v-if="userCurrentPoint - (schedule['price']*total_seat + 10000) < 0">Rp. {{userCurrentPoint - (schedule["price"]*total_seat+10000)}}</b>
                </b-col>
              </b-row>
            </b-card>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    </div>
</template>

<script>
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'SeatSelection',
  components: {
  },
  methods: {
    formatDate (dateString) {
      var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ]
      var daysNames = [
        'Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday',
        'Saturday'
      ]
      var date = new Date(dateString)
      var day = date.getDate()
      var monthIndex = date.getMonth()
      var year = date.getFullYear()

      return ' | ' + daysNames[date.getDay()] + ' | ' + monthNames[monthIndex] + ' ' + day + ', ' + year
    },
    amPmConvert (time) {
      // Check correct time format and split into components
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

      if (time.length > 1) { // If time format correct
        time = time.slice(1) // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM' // Set AM/PM
        time[0] = +time[0] % 12 || 12 // Adjust hours
      }
      return time.join('') // return adjusted time or original string
    },
    selectSeat (row, col) {
      if (this.seats[row - 1][col - 1] !== 2) {
        if (this.seats[row - 1][col - 1] === 0) {
          this.total_seat++
        } else {
          this.total_seat--
        }
        this.seats[row - 1][col - 1] = ((this.seats[row - 1][col - 1] + 1) % 2)
        this.$forceUpdate()
      }
    },
    async payment () {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push({ name: 'login' })
      } else if (this.userCurrentPoint - (this.schedule['price'] * this.total_seat + 10000) < 0) {
        if (confirm('Your Balance isn\'t enough. top up your balance now?')) {
          this.$router.push({ name: 'redeemVoucher' })
        }
        return 0
      } else if (this.total_seat === 0) {
        alert('please select a seat')
        return 0
      }
      var selectedSeat = []
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          if (this.seats[i][j] === 1) {
            selectedSeat.push(String.fromCharCode(65 + i) + (j + 1))
          }
        }
      }
      var body = {
        user_id: this.userCurrentId,
        schedule_id: this.schedule_id,
        seats: selectedSeat
      }
      try {
        await AuthenthicationService.buyTicket(body)
        this.error = null
        this.showError = false
        this.success = 'your payment is successful.'
        this.showSuccess = true
        this.$router.push({ name: 'succesfulPayment' })
      } catch (err) {
        this.error = err.response.data.error
        this.showError = true
        this.success = null
        this.showSucess = false
      }
    }
  },
  data () {
    return {
      seats: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      error: null,
      total_seat: 0,
      showError: false,
      success: null,
      showSuccess: false,
      schedule_id: this.$route.params.id,
      schedule: null,
      showHour: null,
      showDate: null,
      userCurrentPoint: null,
      userCurrentId: null
    }
  },
  async mounted () {
    if (this.$store.state.isUserLoggedIn) {
      this.userCurrentPoint = this.$store.state.user.point
      this.userCurrentId = this.$store.state.user.id
    }
    const takenSeats = await AuthenthicationService.getScheduleTickets(this.schedule_id)
    const scheduleResponse = await AuthenthicationService.getScheduleById(this.schedule_id)
    this.schedule = scheduleResponse.data.schedule
    const responseData = takenSeats.data.tickets
    for (var i = 0; i < responseData.length; i++) {
      const str = responseData[i].seat_no
      const row = str.substring(0, 1).charCodeAt(0) - 65
      const col = str.substring(1) - 1
      this.seats[row][col] = 2
    }
    this.showHour = this.amPmConvert(this.schedule['start_hour'].substr(0, 5))
    this.showDate = this.formatDate(this.schedule['date'])
    this.$forceUpdate()
  }
}
</script>
<style>
  header.card-header {
    background-color:#C25219 !important;
    color:white;
    text-align: center;
  }
  .scheduleInfo col {
    width:10px !important
  }
</style>
