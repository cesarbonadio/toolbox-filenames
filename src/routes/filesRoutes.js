import { Router } from 'express'
import * as filesFormaterController from '../controllers/filesFormaterController.js'

const router = Router()

// files routes
router.get('/data', filesFormaterController.getFormats)

export default router