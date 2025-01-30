import { Router } from 'express'

const router = Router()

// just a health check route
router.get('/health', async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }
  try {
    res.send(healthcheck)
  } catch (e) {
    healthcheck.message = e
    res.status(503).send()
  }
})

export default router
