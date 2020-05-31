import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8010/proxy';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const API = 'api';
const VERSION = 'v1';

const endpoints = {
  auth: {
    main: 'auth',
    login: 'login',
  },
  sensors: 'sensors',
};

/**
 * Get the authorization header
 *
 * @param {string} token - the auth token
 * @returns {object} - The authorization header
 */
function getAuthorizationHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

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

/**
 * Retreive the sensors
 *
 * @param {object} payload - The payload request
 * @param {string} payload.token - The auth token
 * @returns {Promise} - The endpoint response
 */
async function retreiveSensors(payload) {
  try {
    const {
      token,
    } = payload;

    const {
      sensors,
    } = endpoints;

    const { data } = await axios.get(
      `/${API}/${VERSION}/${sensors}`,
      getAuthorizationHeader(token),
    );

    return data;
  } catch (error) {
    throw new Error('There was a problem when we have tried to retrieve the sensors');
  }
}

/**
 * Retreive a sensor
 *
 * @param {object} payload - The payload request
 * @param {string} payload.id - The sensor id
 * @param {string} payload.token - The auth token
 * @returns {Promise} - The endpoint response
 */
async function retreiveSensor(payload) {
  try {
    const {
      id,
      token,
    } = payload;

    const {
      sensors,
    } = endpoints;

    const { data } = await axios.get(
      `/${API}/${VERSION}/${sensors}/${id}`,
      getAuthorizationHeader(token),
    );

    return data;
  } catch (error) {
    throw new Error(`There was a problem when we have tried to retrieve the sensor with id ${payload.id}`);
  }
}

/**
 * Update sensor
 *
 * @param {object} payload - The payload request
 * @param {object} payload.sensor - The sensor to save
 * @param {string} payload.token - The auth token
 * @returns {Promise} - The endpoint response
 */
async function updateSensor(payload) {
  try {
    const {
      sensor,
      token,
    } = payload;

    const {
      sensors,
    } = endpoints;

    const { data } = await axios.put(
      `/${API}/${VERSION}/${sensors}/${sensor.id}`,
      sensor,
      getAuthorizationHeader(token),
    );

    return data;
  } catch (error) {
    throw new Error(`There was a problem when we have tried to save the sensor with id ${payload.sensor.id}`);
  }
}

export default {
  login,
  retreiveSensors,
  retreiveSensor,
  updateSensor,
};
