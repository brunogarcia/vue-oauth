import api from '@/api';
import types from './types';

const { SAVE_SENSORS } = types;

export default {
  namespaced: true,
  state: {
    sensors: [],
  },
  actions: {
    /**
     * Retreive the sensors
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {object} context.rootGetters - modules getters from Vuex
     * @returns {boolean} - The response flag
     */
    async retreiveSensors({ commit, rootGetters }) {
      try {
        const token = rootGetters['auth/token'];
        const response = await api.retreiveSensors({ token });
        commit(SAVE_SENSORS, response);
        return true;
      } catch (error) {
        throw new Error('There was a problem when we have tried to retrieve the sensors');
      }
    },
  },
  mutations: {
    /**
     * Save sensors
     *
     * @param {object} state - Vuex state
     * @param {object} payload - The sensors to store
     */
    [SAVE_SENSORS](state, payload) {
      state.sensors = payload;
    },
  },
  getters: {
    /**
     * Sensors
     *
     * @param {object} state - The module state
     * @returns {Array<object>} - The list of sensors stored
     */
    sensors: (state) => state.sensors,
  },
};
