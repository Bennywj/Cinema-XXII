import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Plaza from '@/views/Plaza'
import Movie from '@/views/Movie'
import PlazaSchedule from '@/views/PlazaSchedule'

// admin view

import AdminGenre from '@/views/admin/AdminGenre'
import AdminSchedule from '@/views/admin/AdminSchedule'

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
      component: AdminGenre
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
    // theater url
    {
      path: '/admin/theater/generateTheater',
      name: 'generateTheater',
      component: GenerateTheater
    },
    // plaza url
    {
      path: '/plazas',
      name: 'plaza',
      component: Plaza
    },
    {
      path: '/admin/plaza/add',
      name: 'addPlaza',
      component: AddPlaza
    },
    // movie url
    {
      path: '/movies',
      name: 'movie',
      component: Movie
    },
    {
      path: '/admin/movie/add',
      name: 'addMovie',
      component: AddMovie
    },
    // plaza schedule url
    {
      path: '/plazas/:id/schedule',
      name: 'plazaSchedule',
      component: PlazaSchedule
    },
    // admin schedule url
    {
      path: '/admin/schedule',
      name: 'adminSchedule',
      component: AdminSchedule
    },
    {
      path: '/admin/schedule/add',
      name: 'addSchedule',
      component: AddSchedule
    }
  ]
})
