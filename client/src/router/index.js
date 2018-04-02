import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Genre from '@/views/admin/Genre'
import AddGenre from '@/views/admin/form/AddGenre'

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
      path: '/genre',
      name: 'genre',
      component: Genre
    },
    {
      path: '/addGenre',
      name: 'addGenre',
      component: AddGenre
    }
  ]
})
