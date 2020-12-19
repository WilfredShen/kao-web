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
          component: () => import('@/components/login/admin-login'),
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
      path: '/',
      component: () => import('@/components/home/header'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/components/home')
        },
        {
          path: 'evaresult',
          name: 'homeevaresult',
          component: () => import('@/components/home/evaluate-result')
        },
        {
          path: 'schooldetail',
          name: 'schoolDetail',
          component: () => import('@/components/home/school-detail'),
        },
        {
          path: 'school',
          name: 'school',
          component: () => import('@/components/home/school')
        },
        {
          path: 'campcard',
          name: 'campCard',
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
      path: '/manager',
      component: () => import('@/components/manager'),
    },
    {
      path: '/selfmain',
      component: () => import('@/components/self'),
    }
  ]
})
