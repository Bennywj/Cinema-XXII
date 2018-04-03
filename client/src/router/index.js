import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Genre from '@/views/admin/Genre'

// form ui
import AddGenre from '@/views/admin/form/AddGenre'
import AddSeat from '@/views/admin/form/AddSeat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin/genre',
      name: 'genre',
      component: Genre
    },
    {
      path: '/admin/genre/addGenre',
      name: 'addGenre',
      component: AddGenre
    },
    {
      path: '/admin/seat/addSeat',
      name: 'addSeat',
      component: AddSeat
    }
  ]
})
