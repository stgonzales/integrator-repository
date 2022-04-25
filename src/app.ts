import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
import monitoro from 'monitoro'
import Queue from './lib/queue'

const app = express()

app.locals.MonitoroQueues = Queue.queues.map((queue) => queue.bull)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(require('express-status-monitor')())

app.use('/api', routes)
app.use('/queue-monitor', monitoro)

export default app
