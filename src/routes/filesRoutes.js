import { Router } from 'express'
import * as filesFormaterController from '../controllers/filesFormaterController.js'
import {
  validateFilesDataParams,
  validateFilesListParams
} from '../middlewares/validators/filesDataValidators.js'

const router = Router()

// files routes
router.get('/data', [validateFilesDataParams], filesFormaterController.getFormats)
router.get('/list', [validateFilesListParams], filesFormaterController.getFilesList)

export default router
