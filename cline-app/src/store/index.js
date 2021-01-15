import Vue from 'vue';
import Vuex from 'vuex';
import action from './action';
import getter from './getter';
import mutations from './mutations';
import state from './state';
Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  action,
  getter,
  mutations
})
export default store