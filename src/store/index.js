import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespace: true,
  modules: {},
  state: {
    uid: '',
    cid: '',
    identify: '尚未选择身份',
    realName: '尚未实名认证',
    isStu: false,//是学生身份
    isTut: false,//是研究生身份
    isManager: false,//是管理员身份
    schoolMap: {},
  },
  mutations: {
    setIdentify(state, id) {
      state.identify = id;
    },
    setrealname(state, msg) {
      state.realName = msg;
    },
    setuid(state, id) {
      state.uid = id;
    },
    setcid(state, cid) {
      state.cid = cid;
      console.log('state', state.cid);
    },
    setLimit(state, msg) {
      if (msg === 'tutor') state.isTut = true;
      else if (msg === 'student') state.isStu = true;
    },
    setSchMap(state, data) {
      state.schoolMap[data.cid] = data.cname;
    }
  },
  actions: {

  },
})

export default store
