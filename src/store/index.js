import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions"
import getters from "./getters"
Vue.use(Vuex)

const state = {
  carList:[] //商品列表
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
