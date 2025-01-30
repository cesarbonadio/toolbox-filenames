import Joi from 'joi'

/**
 * paramsSchema - Joi schema to validate the params of the endpoint /files/data
 *
 * @type {Object}
 */
const paramsSchema = Joi.object({
  fileName: Joi.string()
}).unknown(false)

/**
 * commonErrorValidationHandler - Handles validation errors for schemas.
 * If there are errors, it sends a 500 status response with an array of error messages.
 *
 * @param {Object} error - The validation error object returned from Joi validation.
 * @param {Object} res - The Express response object used to send error messages.
 * @param {Function} next - The Express next function to pass control to the next middleware.
 *
 * @returns {Object|undefined} - Returns a JSON response with error details if there's an error;
 * otherwise, it calls next() to pass control to the next middleware.
 */
const commonErrorValidationHandler = (error, res, next) => {
  if (error) {
    return res.status(400).json({ // 400 as it is bad request - invalid params
      errors: error.details.map(detail => detail.message) // Just the error messages
    })
  }
  next()
}

/**
 * validateParams - Middleware function to validate the params you can pass over the endpoint /files/data
 *
 * @param {Object} req - The Express request object containing the query parameters.
 * @param {Object} res - The Express response object used to send validation errors if any.
 * @param {Function} next - The Express next function to pass control to the next middleware.
 *
 * Usage:
 * Attach this function to a route as middleware to enforce validation
 *
 * Example:
 * app.get('/some-route', validateParams, (req, res) => {
 *     res.send('validated!');
 * });
 */
export const validateFilesDataParams = (req, res, next) => {
  const { error } = paramsSchema.validate(req?.query, { abortEarly: false })
  commonErrorValidationHandler(error, res, next)
}

/**
 * validateFilesListParams - Middleware function to validate you can not pass any params to the endpoint /files/list
 *
 * @param {Object} req - The Express request object containing the query parameters.
 * @param {Object} res - The Express response object used to send validation errors if any.
 * @param {Function} next - The Express next function to pass control to the next middleware.
 *
 * Usage:
 * Attach this function to a route as middleware to enforce validation
 *
 * Example:
 * app.get('/some-route', validateFilesListParams, (req, res) => {
 *     res.send('validated!');
 * });
 */
export const validateFilesListParams = (req, res, next) => {
  console.log(Object.keys(req.query).length)
  let error
  if (Object.keys(req.query).length > 0) {
    error = {
      details: [
        {
          message: 'there is not a queryparam allowed for this method'
        }
      ]
    }
  }
  commonErrorValidationHandler(error, res, next)
}
