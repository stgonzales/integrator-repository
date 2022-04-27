import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import Queue from './lib/queue'

const app = express()

const serverAdapter = new ExpressAdapter()

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: Queue.queues.map(
    (queue) => new BullMQAdapter(queue.bull, { allowRetries: true })
  ),
  serverAdapter,
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(require('express-status-monitor')())

app.use('/api', routes)

serverAdapter.setBasePath('/admin/queues')
app.use('/admin/queues', serverAdapter.getRouter())

export default app
