import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespace: true,
  modules: {},
  state: {
    uid: '',
    identify: '尚未选择身份',
    realname: '尚未实名认证',
    isstu: false,//是学生身份
    istut: false,//是研究生身份
  },
  mutations: {
    setindentify(state, id) {
      state.identify = id;
    },
    setrealname(state, msg) {
      state.realname = msg;
    },
    setuid(state, id) {
      state.uid = id;
    },
    setlimit(state, msg) {
      if (msg === 'tutor') state.istut = true;
      else if (msg === 'student') state.isstu = true;
    }
  }
})

export default store
