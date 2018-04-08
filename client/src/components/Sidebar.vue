<template>
  <b-list-group>
    <b-list-group-item href="#" :to="{ name: 'adminGenre'}"><icon name="smile-o" class="mr-3"></icon>Genres</b-list-group-item>
    <b-list-group-item href="#" :to="{ name: 'adminMovie'}"><icon name="film" class="mr-3"></icon>Movies</b-list-group-item>
    <b-list-group-item href="#" :to="{ name: 'adminPlaza'}"><icon name="building-o" class="mr-3"></icon>Plazas</b-list-group-item>
    <b-list-group-item href="#" :to="{ name: 'adminSchedule'}"><icon name="calendar" class="mr-3"></icon>Schedule</b-list-group-item>
    <b-list-group-item href="#" :to="{ name: 'generateSeat'}"><icon name="users" class="mr-3"></icon>Seats</b-list-group-item>
    <b-list-group-item href="#" :to="{ name: 'generateTheater'}"><icon name="television" class="mr-3"></icon>Theater</b-list-group-item>
    <b-list-group-item href="#"><icon name="money" class="mr-3"></icon>Top Up</b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
