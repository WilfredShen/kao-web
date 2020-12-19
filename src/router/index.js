import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('@/components/admin/login'),
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
      path: '/',
      name: 'Header',
      component: () => import('@/components/home/header'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/components/home/index')
        },
        {
          path: 'evaluate/result',
          name: 'EvaluateResult',
          component: () => import('@/components/home/evaluation/result')
        },
        {
          path: 'college/detail',
          name: 'CollegeDetail',
          component: () => import('@/components/home/college/detail'),
        },
        {
          path: 'college',
          name: 'College',
          component: () => import('@/components/home/college/index')
        },
        {
          path: 'camp',
          name: 'Camp',
          component: () => import('@/components/home/camp')
        },
        {
          path: 'analysis',
          name: 'Analysis',
          component: () => import('@/components/analysis')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/components/admin/index'),
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('@/components/user/index'),
    }
  ]
})
