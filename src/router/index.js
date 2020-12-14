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
      path: '/manager',
      component: () => import('@/components/manager/manager'),
      children: [
        {
          path: 'changeresult',
          name: 'changeresult',
          component: () => import('@/components/manager/changeresult')
        },
        {
          path: 'uploadnews',
          name: 'uploadnews',
          component: () => import('@/components/manager/uploadnews'),
        },
        {
          path: 'assessresult',
          name: 'assessresult',
          component: () => import('@/components/manager/assessresult')
        },
        {
          path: 'newslist',
          name: 'newslist',
          component: () => import('@/components/manager/newslist')
        },
      ]
    },
    {
      path: '/selfmain',
      component: () => import('@/components/home/self/selfmain'),
    }
    // {
    //   path: '/*',
    //   name: '404',
    //   component: () => import('@/components/HelloWorld'),
    // },
  ]
})
