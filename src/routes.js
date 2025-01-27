import { Router } from 'express'
import * as filesFormaterController from './controllers/filesFormaterController.js'

const router = Router()

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

// routes
router.get('/files/data', filesFormaterController.getFormats)

export default router