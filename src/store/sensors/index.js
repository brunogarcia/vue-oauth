import api from '@/api';
import types from './types';

const {
  SAVE_SENSOR,
  SAVE_SENSORS,
} = types;

export default {
  namespaced: true,
  state: {
    sensor: [],
    sensors: [],
  },
  actions: {
    /**
     * Retreive the sensors
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {object} context.rootGetters - modules getters from Vuex
     * @returns {boolean|Error} - The response flag
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

    /**
     * Retreive a sensor
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {object} context.rootGetters - modules getters from Vuex
     * @param {string} id - The sensor id
     * @returns {boolean|Error} - The response flag
     */
    async retreiveSensor({ commit, rootGetters }, id) {
      try {
        const token = rootGetters['auth/token'];
        const response = await api.retreiveSensor({ id, token });
        commit(SAVE_SENSOR, response);
        return true;
      } catch (error) {
        throw new Error(`There was a problem when we have tried to retrieve the sensor with id ${id}`);
      }
    },
  },
  mutations: {
    /**
     * Save sensor
     *
     * @param {object} state - Vuex state
     * @param {object} payload - The sensor to store
     */
    [SAVE_SENSOR](state, payload) {
      state.sensor = payload;
    },

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
     * Sensor
     *
     * @param {object} state - The module state
     * @returns {object} - The sensor stored
     */
    sensor: (state) => state.sensor,

    /**
     * Sensors
     *
     * @param {object} state - The module state
     * @returns {Array<object>} - The list of sensors stored
     */
    sensors: (state) => state.sensors,
  },
};
