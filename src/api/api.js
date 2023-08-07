import axios from "axios";

const API_BASE_URL = " http://localhost:8080";

/**
 * Retrieves data from the API at the specified endpoint using a GET request.
 * @async
 * @param {string} endpoint - The endpoint to retrieve data from.
 * @returns {Promise<object>} - The data returned from the API.
 */
const get = async (endpoint) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
  return response.data;
};

/**
 * Retrieves data from the API at the specified endpoint and id using a GET request.
 * @async
 * @param {string} endpoint - The endpoint to retrieve data from.
 * @param {string} id - The id of the data to retrieve.
 * @returns {Promise<object>} - The data returned from the API.
 */
const getById = async (endpoint, id) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
  return response.data;
};

const post = async (endpoint, data) => {
  const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
  return response.data;
};

const put = async (endpoint, data) => {
  const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
  return response.data;
};

export { get, post, put, getById };
