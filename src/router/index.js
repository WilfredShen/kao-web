import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/a',
      name: 'Admin',
      component: () => import('@/components/admin'),
      children: [
        {
          path: 'login',
          name: 'AdminLogin',
          component: () => import('@/components/login/AdminLogin'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/login'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/register'),
    },
    {
      path: '/pwd',
      name: 'Forgot',
      component: () => import('@/components/forgot')
    },
    {
      path: '/infodemo',
      name: 'InfoDemo',
      component: () => import('@/components/demo/info-demo'),
    },
    {
      path: '/*',
      name: '404',
      component: () => import('@/components/HelloWorld'),
    },
  ],
})
