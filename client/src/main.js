// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* Pick one way between the 2 following ways */

// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)
Vue.config.productionTip = false

Vue.use(BootstrapVue)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
