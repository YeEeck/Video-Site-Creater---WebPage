import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logined: false,
    url: "",
  },
  getters: {},
  mutations: {
    login(state, payload) {
      state.logined = payload;
    },
    setUrl(state, payload) {
      state.url = payload;
    },
  },
  actions: {},
  modules: {},
});
