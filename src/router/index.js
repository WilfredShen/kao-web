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
      path: '/',
      component: () => import('@/components/home/header'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/components/home/index')
        },
        {
          path: 'evaresult',
          name: 'homeevaresult',
          component: () => import('@/components/home/evaresult')
        },
        {
          path: 'schooldetail',
          name: 'schoolDetail',
          component: () => import('@/components/home/schooldetail'),
        },
        {
          path: 'school',
          name: 'school',
          component: () => import('@/components/home/school')
        },
        {
          path: 'campcard',
          name: 'campCard',
          component: () => import('@/components/home/campcard')
        },
        {
          path: 'analysis',
          name: 'Analysis',
          component: () => import('@/components/analysis/Analysis')
        }
      ]
    },
    {
      path: '/selfheader',
      component: () => import('@/components/home/selfheader'),
      children: [
        {
          path: 'teainfo',
          name: 'TeaInfo',
          component: () => import('@/components/home/self/teainfo')
        },
        {
          path: 'basicinfo',
          name: 'basicInfo',
          component: () => import('@/components/home/self/basicinfo')
        },
        {
          path: 'collect',
          name: 'collect',
          component: () => import('@/components/home/self/collect')
        },
        {
          path: 'querystu',
          name: 'queryStu',
          component: () => import('@/components/home/self/querystu')
        },
        {
          path: '',
          name: 'selfHome',
          component: () => import('@/components/home/self/selfhome')
        },
        {
          path: 'stuinfo',
          name: 'stuInfo',
          component: () => import('@/components/home/self/stuinfo')
        }
      ]
    },
    // {
    //   path: '/*',
    //   name: '404',
    //   component: () => import('@/components/HelloWorld'),
    // },
  ]
})
