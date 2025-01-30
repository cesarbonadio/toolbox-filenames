import * as filesFormaterService from '../services/filesFormaterService.js'
import { handleControllerError, sendSuccessResponse } from '../utils/responseHelpers.js'

/**
 * Controller function to fetch and return the list of file formats.
 *
 * This function interacts with the `filesFormaterService` to retrieve the available file formats.
 * It sends the result as a JSON response or an error response in case of failure.
 *
 * @async
 * @function
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs during the service call, it is logged and an appropriate error response is sent.
 */
export const getFormats = async (req, res) => {
  try {
    const specificFile = req?.query?.fileName || null
    const formats = await filesFormaterService.getFormats(specificFile)
    sendSuccessResponse(res, formats)
  } catch (error) {
    handleControllerError(res, error, 'Error getting the files formats at controller level')
  }
}

/**
 * Controller function to fetch the identical list as the external API returns, same format
 *
 * @async
 * @function
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs during the service call, it is logged and an appropriate error response is sent.
 */
export const getFilesList = async (req, res) => {
  try {
    const filesList = await filesFormaterService.getTotalFilesList()
    sendSuccessResponse(res, filesList)
  } catch (error) {
    handleControllerError(res, error, 'Error fetching file names at controller level')
  }
}
