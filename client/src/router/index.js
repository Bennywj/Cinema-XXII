import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Plaza from '@/views/Plaza'
import Movie from '@/views/Movie'
import MovieDetail from '@/views/MovieDetail'
import PlazaSchedule from '@/views/PlazaSchedule'
import MovieSchedule from '@/views/MovieSchedule'
import SeatSelection from '@/views/SeatSelection'
import SuccesfulPayment from '@/views/SuccessPayment'

// admin view

import AdminGenre from '@/views/admin/AdminGenre'
import AdminSchedule from '@/views/admin/AdminSchedule'

import AddGenre from '@/views/admin/form/AddGenre'
import AddPlaza from '@/views/admin/form/AddPlaza'
import AddMovie from '@/views/admin/form/AddMovie'
import AddSchedule from '@/views/admin/form/AddSchedule'
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
      redirect: '/admin/genre',
      name: 'admin'
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
      path: '/movies/:id',
      name: 'movieDetail',
      component: MovieDetail
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
    // movie schedule url
    {
      path: '/movies/:id/schedule',
      name: 'movieSchedule',
      component: MovieSchedule
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
    },
    // seat selection
    {
      path: '/seatSelection/schedules/:id',
      name: 'seatSelection',
      component: SeatSelection
    },
    // success payment
    {
      path: '/succesfulPayment',
      name: 'succesfulPayment',
      component: SuccesfulPayment
    }
  ]
})
