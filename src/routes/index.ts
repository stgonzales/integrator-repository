import { Router } from 'express'

import newEntryRoute from './new-entry.routes'
import validateFileRoute from './validate-file.routes'
import saveFileRoute from './save-file.routes'

const routes = Router()

routes.use('/new-entry', newEntryRoute)
routes.use('/validate-file', validateFileRoute)
routes.use('/save-file', saveFileRoute)

export default routes
