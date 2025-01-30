import rateLimit from 'express-rate-limit'

/**
 * A rate-limiting middleware to control the number of requests from a single IP address.
 *
 * @constant {Object} limiter
 * @property {number} windowMs - The time frame for which requests are checked/limited (in milliseconds).
 * @property {number} max - The maximum number of requests allowed per IP address within the `windowMs`.
 * @property {string} message - The response message sent when the request limit is exceeded.
 * @property {boolean} headers - Indicates whether rate limit headers (`X-RateLimit-*`) are included in the response.
 *
 * @example
 * app.use(limiter); // Apply rate limiting to all routes
 */
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  headers: true
})

export default limiter
