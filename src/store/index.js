import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import sensors from './sensors';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    sensors,
  },
});
