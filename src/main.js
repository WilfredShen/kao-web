import Vue from 'vue'
<<<<<<< HEAD
import Vuex from 'vuex'
=======
>>>>>>> 6a11c12626f042e559b9256082a88e24950a12aa
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
<<<<<<< HEAD
import store from "@/store";
import router from './router'
=======
>>>>>>> 6a11c12626f042e559b9256082a88e24950a12aa

Vue.config.productionTip = false

Vue.use(ElementUI)
<<<<<<< HEAD
Vue.use(Vuex)

Vue.prototype.$axios = axios

new Vue({
    render: h => h(App),
    router,
    store,
=======

Vue.prototype.$axios = axios

import router from './router'

new Vue({
  render: h => h(App),
  router
>>>>>>> 6a11c12626f042e559b9256082a88e24950a12aa
}).$mount('#app')
