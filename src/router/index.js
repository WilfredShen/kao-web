import Vue from 'vue'
import VueRouter from 'vue-router'
import queryStu from "@/components/home/self/queryStu";
import selfHome from "@/components/home/self/selfHome";
import stuInfo from "@/components/home/self/stuInfo";

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
      name: 'home',
      component: () => import('@/components/home/Home')
    },
    {
      path: '/evaResult',
      name: 'evaluatearesult',
      component: () => import('@/components/home/evaResult')
    },
    {
      path: '/schoolDetail',
      name: 'schoolDetail',
      component: () => import('@/components/home/schoolDetail'),
    },
    {
      path: '/school',
      name: 'school',
      component: () => import('@/components/home/school')
    },
    {
      path: '/campCard',
      name: 'campCard',
      component: () => import('@/components/home/campCard')
    },
    {
      path: '/Analysis',
      name: 'Analysis',
      component: () => import('@/components/home/Analysis')
    },
    {
      path: '/self',
      name: 'self',
      component: () => import('@/components/home/self'),
      children: [
        {
          path: '/self/TeaInfo',
          name: 'TeaInfo',
          component: () => import('@/components/home/self/TeaInfo')
        },
        {
          path: '/self/basicInfo',
          name: 'basicInfo',
          component: () => import('@/components/home/self/basicInfo')
        },
        {
          path: '/self/collect',
          name: 'collect',
          component: () => import('@/components/home/self/collect')
        },
        {
          path: '/self/queryStu',
          name: queryStu,
          component: () => import('@/components/home/self/queryStu')
        },
        {
          path: '/self/selfHome',
          name: selfHome,
          component: () => import('@/components/home/self/selfHome')
        },
        {
          path: '/self/stuInfo',
          name: stuInfo,
          component: () => import('@/components/home/self/stuInfo')
        }
      ]
    },
  ],
})
