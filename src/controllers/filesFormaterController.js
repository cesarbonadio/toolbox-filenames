import * as filesFormaterService from '../services/filesFormaterService.js'

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
export const getFormats = async(req, res) => {
	try {
		const result = await filesFormaterService.getFormats()
		res.json(result)
	} catch (error) {
		console.error('Error getting the files formats at controller level', error)
    	res.status(error.status || 500).json({
			error: error.type,
			message: `${error.errorData?.code} - ${error.message}`
		})
	}
}