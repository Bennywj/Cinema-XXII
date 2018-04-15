<template>
  <div id="app">
    <PageHeader/>
    <b-container style="background-color:white;padding-left: 0px !important;padding-right: 0px !important;">
      <router-view>
      </router-view>
    </b-container>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: black;
  }
  .carousel-caption {
      background: rgba(0, 0, 0, 0.45);
  }
  a {
    text-decoration: none;
  }
  * {
    outline:none
  }
</style>
