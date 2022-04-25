import { Router } from 'express'

import validateFileRoute from './validate-file.routes'
import saveFileRoute from './save-file.routes'

import NewEntryController from '../controllers/NewEntryController'

const newEntryController = new NewEntryController()

const routes = Router()

routes.post('/new-entry', newEntryController.index)
routes.use('/validate-file', validateFileRoute)
routes.use('/save-file', saveFileRoute)

export default routes
