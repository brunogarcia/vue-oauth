import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8010/proxy';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const endpoints = {
  auth: {
    main: 'auth',
    login: 'login',
  },
};

/**
 * Login
 *
 * @param {object} payload - The payload request
 * @param {string} payload.username - The username
 * @param {string} payload.password - The password
 * @returns {Promise} - The endpoint response
 */
async function login(payload) {
  try {
    const {
      username,
      password,
    } = payload;

    const {
      auth,
    } = endpoints;

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const { data } = await axios.post(`/${auth.main}/${auth.login}`, params);

    return data;
  } catch (error) {
    throw new Error('The username or the password is not valid!');
  }
}

export default {
  login,
};
