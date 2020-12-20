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
    realName: '尚未实名认证',
    isStu: false,//是学生身份
    isTut: false,//是研究生身份
    isManager: false,//是管理员身份
    camps: [],//夏令营
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
})

export default store
