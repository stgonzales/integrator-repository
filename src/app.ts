import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(require('express-status-monitor')())

app.use('/api', routes)

export default app
