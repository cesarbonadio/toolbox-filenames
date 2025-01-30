import axiosConfig from '../config/axios.js'

/**
 * A generic utility function for making HTTP requests with Axios.
 *
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {Object} [data] - The request payload for POST, PUT, or PATCH requests.
 * @param {Object} [params] - Query parameters for GET requests.
 * @param {Object} [headers] - Custom headers for the request.
 * @param {Boolean} returnAllResult - a Parameter that defines if should return all results
 * @returns {Promise<Object>} - A promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails.
 *
 * @example
 * makeRequest('https://api.example.com/data', 'GET', null, { userId: 123 })
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error))
 */
const makeRequest = async ({ method, url, data = {}, params = {}, headers = {} }, returnAllResult = false) => {
  try {
    const response = await axiosConfig({
      method,
      url,
      data,
      params,
      headers: {
        ...axiosConfig.defaults.headers,
        ...headers
      }
    })
    return returnAllResult ? response : response.data
  } catch (error) {
    console.error('API Request Error:', error.message)
    throw error.response?.data || error.message
  }
}

export default makeRequest
