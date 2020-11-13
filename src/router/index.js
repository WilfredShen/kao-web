import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import InfoDemo from '@/components/demo/info-demo'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/infodemo',
      name: 'InfoDemo',
      component: InfoDemo,
    },
  ],
})