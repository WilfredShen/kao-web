import Vue from 'vue'
import Vuex from 'vuex'
import ChinaMap from "@/store/modules/ChinaMap";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        ChinaMap
    }
})

export default store
