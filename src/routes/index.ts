import { Router } from 'express'
import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage(),
})

// import validateFileRoute from './validate-file.routes'

import NewEntryController from '../controllers/NewEntryController'
import SaveFileController from '../controllers/SaveFileController'
import CheckDetailsController from '../controllers/CheckDetailsController'
import ValidateFileController from '../controllers/ValidateFileController'

const newEntryController = new NewEntryController()
const saveFileController = new SaveFileController()
const checkDetailsController = new CheckDetailsController()
const validateFileController = new ValidateFileController()

const routes = Router()

routes.post('/new-entry', newEntryController.index)
routes.post(
  '/validate-file',
  upload.single('photo'),
  validateFileController.index
)
routes.post('/save-file', upload.single('photo'), saveFileController.index)
routes.post('/check-details', checkDetailsController.index)

export default routes
