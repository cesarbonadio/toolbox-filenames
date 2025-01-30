/**
 * Sends a standardized success response.
 *
 * @param {import('express').Response} res - The response object.
 * @param {any} data - The data to send in the response.
 * @param {number} [status=200] - HTTP status code.
 */
export const sendSuccessResponse = (res, data, status = 200) => {
  res.status(status).json(data)
}

/**
 * Handles errors at the controller level.
 *
 * @param {import('express').Response} res - The response object.
 * @param {Error} error - The error to handle.
 * @param {string} logMessage - A message to log for debugging purposes.
 */
export const handleControllerError = (res, error, logMessage) => {
  console.error(logMessage, error)
  res.status(error.status || 500).json({
    success: false,
    error: error.type || 'InternalServerError',
    message: error.errorData?.code
      ? `${error.errorData.code} - ${error.message}`
      : error.message
  })
}
