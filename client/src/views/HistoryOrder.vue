<template>
  <div class="p-4">
    <b-row class="mt-3 mb-3">
      <div style="background-color:#C25219 ;width:100%;display:block;height:2px;"/>
    </b-row>
    <b-row>
      <b-col cols="2"></b-col>
      <b-col cols="8">
        <b-row>
          <b-col align="center">
            <div class="head">
              Booking History
            </div>
          </b-col>
        </b-row>
        <b-card tag="article">
          <div v-for="(order,index) in orders" :key="order.id">
            <b-row  class="m-1">
              <b-col>
                 <h5><b>Movie</b></h5>
              </b-col>:
              <b-col>
                 <h5><b>{{order.movie_name}}</b></h5>
              </b-col>
            </b-row>
            <b-row  class="m-1">
              <b-col>
                 <h5>Seats</h5>
              </b-col>:
              <b-col>
                <h5><span v-for="(seat,j) in order.seats" :key="seat">{{seat}}<span v-if="j != order.seats.length-1">,&nbsp;</span></span> </h5>
              </b-col>
            </b-row>
            <b-row  class="m-1">
              <b-col>
                 <h5>Start Hour</h5>
              </b-col>:
              <b-col>
                 <h5>{{order.start_hour}}</h5>
              </b-col>
            </b-row>
            <b-row  class="m-1">
              <b-col>
                 <h5>Date</h5>
              </b-col>:
              <b-col>
                 <h5>{{order.date}}</h5>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col>
                 <h5>Booking Code</h5>
              </b-col>:
              <b-col>
                <h5>{{order.order_id}}</h5>
              </b-col>
            </b-row>
            <b-row  class="m-1">
              <b-col>
                 <h5>Total Price</h5>
              </b-col>:
              <b-col>
                <h5>Rp. {{order.price*orders.length}}</h5>
              </b-col>
            </b-row>
            <div style="background-color:#C25219 ;width:100%;display:block;height:2px;" class="mt-4 mb-4" v-if="index != orders.length-1"/>
          </div>
        </b-card>
      </b-col>
    </b-row>
    </div>
</template>

<script>
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'HistoryOrder',
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

      return daysNames[date.getDay()] + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year
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
    }
  },
  data () {
    return {
      orders: []
    }
  },
  async mounted () {
    if (this.$store.state.isUserLoggedIn) {
      const orderObj = await AuthenthicationService.getUserHistory(this.$store.state.user.id)
      const orderData = orderObj.data.orders
      this.orders = orderData
      for (var i = 0; i < orderData.length; i++) {
        this.orders[i].start_hour = this.amPmConvert(orderData[i].start_hour.substr(0, 5))
        this.orders[i].date = this.formatDate(orderData[i].date)
      }
    }
  }
}
</script>

<style>
  .head {
    text-align: center;
    background-color: #C25219;
    padding: .5em;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
  }
</style>
