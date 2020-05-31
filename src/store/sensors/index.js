import api from '@/api';
import types from './types';

const {
  SAVE_SENSOR,
  SAVE_SENSORS,
  SAVE_SENSOR_ITEM,
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

    /**
     * Update a sensor on the DB
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {object} context.rootGetters - modules getters from Vuex
     * @param {object} sensor - The sensor to save
     * @returns {boolean|Error} - The response flag
     */
    async updateSensor({ commit, rootGetters }, sensor) {
      try {
        const token = rootGetters['auth/token'];
        const response = await api.updateSensor({ sensor, token });
        commit(SAVE_SENSOR, response);
        return true;
      } catch (error) {
        throw new Error(`There was a problem when we have tried to save the sensor with id ${sensor.id}`);
      }
    },

    /**
     * Save sensor item on Vuex
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {string} item - The sensor item
     * @returns {boolean|Error} - The response flag
     */
    saveSensorItem({ commit }, item) {
      commit(SAVE_SENSOR_ITEM, item);
      return true;
    },
  },
  mutations: {
    /**
     * Save sensor on Vuex
     *
     * @param {object} state - Vuex state
     * @param {object} payload - The sensor to store
     */
    [SAVE_SENSOR](state, payload) {
      state.sensor = payload;
    },

    /**
     * Save sensor item on Vuex
     *
     * @param {object} state - Vuex state
     * @param {string} item - The item to store
     */
    [SAVE_SENSOR_ITEM](state, item) {
      state.sensor = { ...state.sensor, ...item };
    },

    /**
     * Save sensors on Vuex
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
