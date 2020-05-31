import api from '@/api';
import types from './types';

const { SAVE_TOKEN } = types;

export default {
  namespaced: true,
  state: {
    token: null,
  },
  actions: {
    /**
     * Login
     *
     * @param {object} context - Vuex context
     * @param {Function} context.commit - Vuex commit
     * @param {object} payload - The payload request
     * @param {string} payload.username - The username
     * @param {string} payload.password - The password
     * @returns {boolean|Error} - The response flag
     */
    async login({ commit }, payload) {
      try {
        const { access_token: accessToken } = await api.login(payload);
        commit(SAVE_TOKEN, accessToken);
        return true;
      } catch (error) {
        throw new Error('The username or the password is not valid!');
      }
    },
  },
  mutations: {
    /**
     * Save token
     *
     * @param {object} state - Vuex state
     * @param {object} payload - The token to store
     */
    [SAVE_TOKEN](state, payload) {
      state.token = payload;
    },
  },
  getters: {
    /**
     * Token
     *
     * @param {object} state - The module state
     * @returns {string} - The token stored
     */
    token: (state) => state.token,
  },
};
