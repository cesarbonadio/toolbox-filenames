/*
 *
    for this project structure, and in this case, the model
    will be the responsible as acting as a hub to fetch
    the external API
*/
import makeRequest from '../utils/axiosRequester.js'

/**
 * Fetches the list of files from the `/secret/files` endpoint.
 *
 * This function makes a GET request to the API to retrieve the list of files.
 * It safely extracts the `files` property from the API response. If the `files`
 * property is missing or undefined, an empty array is returned.
 *
 * @async
 * @function
 * @returns {Promise<Array>} A promise that resolves to an array of files. If no files are found, returns an empty array.
 * @throws {Error} If the request fails, the error is propagated for handling by the caller.
 */
export const fetchFilesList = async () => {
  return (await makeRequest({
    method: 'GET',
    url: '/secret/files'
  }))?.files ?? []
}

/**
 * Fetches the content of a file by its name from the `/secret/file/{fileName}` endpoint.
 *
 * This function makes a GET request to the API to retrieve the content of the specified file.
 * If the response is undefined or null, it returns `null` as a fallback.
 *
 * @async
 * @function
 * @param {string} fileName - The name of the file to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the file content as an object, or `null` if no content is found.
 * @throws {Error} If the request fails, the error is propagated for handling by the caller.
 */
export const fetchFileContentByName = async (fileName) => {
  return (await makeRequest({
    method: 'GET',
    url: `/secret/file/${fileName}`
  })) ?? null
}
