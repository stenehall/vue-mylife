import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Activities from '@/components/Activities'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/activities',
      name: 'Activities',
      component: Activities
    }
  ]
})
