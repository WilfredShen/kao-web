import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
  },
  state:{
    username:'',
  },
  mutations:{
    setUsername(state,name){
      state.username = name;
    }
  }
})

export default store
