import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
  },
  state:{
    username:'',
    identify:'尚未选择身份',
    realname:'尚未实名认证',
  },
  mutations:{
    setUsername(state,name){
      state.username = name;
    },
    setindentify(state,id){
      state.identify = id;
    },
    setrealname(state,msg){
      state.realname = msg;
    }
  }
})

export default store
