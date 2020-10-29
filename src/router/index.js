import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
})