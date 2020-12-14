import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespace: true,
  modules: {},
  state: {
    uid: '',
    cid: '',
    identify: '尚未选择身份',
    realname: '尚未实名认证',
    isstu: false,//是学生身份
    istut: false,//是研究生身份
    ismanager: false,//是管理员身份
    camps: [],//夏令营
    schoolMap: {},
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
    setcid(state, cid) {
      state.cid = cid;
    },
    setlimit(state, msg) {
      if (msg === 'tutor') state.istut = true;
      else if (msg === 'student') state.isstu = true;
    },
    setCamps(state, camps) {
      for (let i = 0; i < camps.length; i++) {
        state.camps.push(camps[i]);
      }
    },
    setSchMap(state, data) {
      state.schoolMap[data.cid] = data.cname;
    }
  },
  actions: {
    getCamps(context) {
      axios.get("/api/base/summer-camp")
        .then(res => {
          console.log("获取夏令营成功" + res.data);
          context.commit('setCamps', res.data.data);
        })
    },
  },
  getters: {}
})

export default store
