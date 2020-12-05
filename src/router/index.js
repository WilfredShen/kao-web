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
      path: '/',
      component: () => import('@/components/home/homeheader'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/components/home/home')
        },
        {
          path: 'homeevaresult',
          name: 'evaresult',
          component: () => import('@/components/home/homeevaresult')
        },
        {
          path: 'homeschooldetail',
          name: 'schoolDetail',
          component: () => import('@/components/home/homeschooldetail'),
        },
        {
          path: 'homeschool',
          name: 'school',
          component: () => import('@/components/home/homeschool')
        },
        {
          path: 'homecampcard',
          name: 'campCard',
          component: () => import('@/components/home/homecampcard')
        },
        {
          path: 'homeanalysis',
          name: 'Analysis',
          component: () => import('@/components/home/homeanalysis')
        }
      ]
    },
    {
      path: '/selfheader',
      component: () => import('@/components/home/selfheader'),
      children: [
        {
          path: 'selfteainfo',
          name: 'TeaInfo',
          component: () => import('@/components/home/self/selfteainfo')
        },
        {
          path: 'selfbasicinfo',
          name: 'basicInfo',
          component: () => import('@/components/home/self/selfbasicinfo')
        },
        {
          path: 'selfcollect',
          name: 'collect',
          component: () => import('@/components/home/self/selfcollect')
        },
        {
          path: 'selfquerystu',
          name: 'queryStu',
          component: () => import('@/components/home/self/selfquerystu')
        },
        {
          path: '',
          name: 'selfHome',
          component: () => import('@/components/home/self/selfhome')
        },
        {
          path: 'selfstuinfo',
          name: 'stuInfo',
          component: () => import('@/components/home/self/selfstuinfo')
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
