import { Queue, Job, QueueEvents } from 'bullmq'
import connection from '../config/ioredis'

import * as jobs from '../jobs'

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { connection }),
  events: new QueueEvents(job.key, { connection }),
  name: job.key,
  handle: job.worker,
}))

export default {
  queues,
  add(name: string, data: Job) {
    const queue = this.queues.find((queue) => queue.name === name)

    return queue?.bull.add(name, data)
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.events.on('completed', (job) => {
        console.log('Job completed!', job)
      })

      queue.bull.on('error', (err) => {
        console.error('Job failed!', err)
      })
    })
  },
}
