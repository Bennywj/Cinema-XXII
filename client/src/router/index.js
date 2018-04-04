import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Genre from '@/views/admin/Genre'
import Plaza from '@/views/admin/Plaza'

// form ui
import AddGenre from '@/views/admin/form/AddGenre'
import AddPlaza from '@/views/admin/form/AddPlaza'
import GenerateSeat from '@/views/admin/form/GenerateSeat'
import GenerateTheater from '@/views/admin/form/GenerateTheater'

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
    // genre url
    {
      path: '/admin',
      redirect: '/admin/genre'
    },
    {
      path: '/admin/genre',
      name: 'genre',
      component: Genre
    },
    {
      path: '/admin/genre/add',
      name: 'addGenre',
      component: AddGenre
    },
    // seat url
    {
      path: '/admin/seat/generateSeat',
      name: 'generateSeat',
      component: GenerateSeat
    },
    {
      path: '/admin/theater/generateTheater',
      name: 'generateTheater',
      component: GenerateTheater
    },
    // plaza url
    {
      path: '/admin/plaza',
      name: 'plaza',
      component: Plaza
    },
    {
      path: '/admin/plaza/add',
      name: 'addPlaza',
      component: AddPlaza
    }
  ]
})
