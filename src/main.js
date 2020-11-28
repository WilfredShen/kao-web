import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from "@/store";

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.prototype.$axios = axios

import router from './router'

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
