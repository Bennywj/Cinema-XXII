<template>
  <b-container style="background-color:white">
    <img
         src="../img/icon.png"
         height="80px"
         @click="navigateTo('/')"
         class="mt-2 mb-2">
    <b-navbar toggleable="md" style="background-color:#C25219">
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item href="#" @click="navigateTo('/')" actives> HOME </b-nav-item>
            <b-nav-item href="#">MOVIES</b-nav-item>
            <b-nav-item href="#">SCHEDULES</b-nav-item>
            <b-nav-item href="#">CINEMAS</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" @click="navigateTo('login')" v-if="!$store.state.isUserLoggedIn">
              <icon name="sign-in" class="mr-1"></icon>
              Login
            </b-nav-item>
            <b-nav-item href="#" @click="navigateTo('register')" v-if="!$store.state.isUserLoggedIn">
              <icon name="user-plus" class="mr-1"></icon>
              Register
            </b-nav-item>
            <b-nav-item href="#" @click="logout" v-if="$store.state.isUserLoggedIn">
              <icon name="sign-out" class="mr-1"></icon>
              Logout
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>
  .nav-link {
    color:#EEEEEE !important;
  }
  .container {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
</style>
