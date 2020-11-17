import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import NewsCheck from "@/components/NewsCheck";
import UploadNews from "@/components/UploadNews";
import AssessResult from "@/components/AssessResult";
import NewsList from "@/components/NewsList";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },{
      name: NewsCheck,
      path:'/',
      component:NewsCheck,
    },{
      name: AssessResult,
      path:'/AssessResult',
      component: AssessResult
    },{
      name: UploadNews,
      path:'/UploadNews',
      component: UploadNews
    },{
      name: NewsList,
      path:'/NewsList',
      component: NewsList
    }
  ],
})
