import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Genre from '@/views/admin/Genre'
import Plaza from '@/views/admin/Plaza'
import Movie from '@/views/admin/Movie'
import Schedule from '@/views/admin/Schedule'

// form ui
import AddGenre from '@/views/admin/form/AddGenre'
import AddPlaza from '@/views/admin/form/AddPlaza'
import AddMovie from '@/views/admin/form/AddMovie'
import AddSchedule from '@/views/admin/form/AddSchedule'
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
      name: 'adminGenre',
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
      name: 'adminPlaza',
      component: Plaza
    },
    {
      path: '/admin/plaza/add',
      name: 'addPlaza',
      component: AddPlaza
    },
    // movie url
    {
      path: '/admin/movie',
      name: 'adminMovie',
      component: Movie
    },
    {
      path: '/admin/movie/add',
      name: 'addMovie',
      component: AddMovie
    },
    // Schedule url
    {
      path: '/admin/schedule',
      name: 'adminSchedule',
      component: Schedule
    },
    {
      path: '/admin/schedule/add',
      name: 'addSchedule',
      component: AddSchedule
    }
  ]
})
