import Queue, { Job } from 'bull'
import redisConfig from '../config/redis'

import * as jobs from '../jobs'

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, {
    redis: {
      host: redisConfig.host,
      port: +redisConfig.port,
    },
  }),
  name: job.key,
  handle: job.handle,
}))

export default {
  queues,
  add(name: string, data: Job) {
    const queue = this.queues.find((queue) => queue.name === name)

    return queue?.bull.add(data)
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle)

      queue.bull.on('failed', (job, err) => {
        console.error('Job failed!', err)
      })
    })
  },
}
