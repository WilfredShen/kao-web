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
          path: 'evaluation/result',
          name: 'EvaluationResult',
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
      redirect: '/admin/evaluation/assess',
      children: [
        {
          path: 'evaluation/assess',
          name: 'AssessEval',
          component: () => import('@/components/admin/evaluation/assess')
        },
        {
          path: 'evaluation/modify',
          name: 'Modify',
          component: () => import('@/components/admin/evaluation/modify')
        },
        {
          path: 'news/list',
          name: 'ShowList',
          component: () => import('@/components/admin/news/list')
        },
        {
          path: 'news/upload',
          name: 'UploadNews',
          component: () => import('@/components/admin/news/upload')
        }
      ]
    },
    {
      path: '/user',
      name: 'User',
      redirect: '/user/info',
      component: () => import('@/components/user/index'),
      children: [
        {
          path: 'info',
          name: 'Info',
          component: () => import('@/components/user/info')
        },
        {
          path: 'student/favor',
          name: 'Favor',
          component: () => import('@/components/user/student/favor')
        },
        {
          path: 'student/focus-news',
          name: 'FocusNews',
          component: () => import('@/components/user/student/focus-news')
        },
        {
          path: 'student/info',
          name: 'StudentInfo',
          component: () => import('@/components/user/student/info')
        },
        {
          path: 'tutor/info',
          name: 'TutorInfo',
          component: () => import('@/components/user/tutor/info')
        },
        {
          path: 'tutor/query-student',
          name: 'QueryStudent',
          component: () => import('@/components/user/tutor/query-student')
        }
      ]
    }
  ]
})
