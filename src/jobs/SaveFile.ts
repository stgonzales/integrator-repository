import { Worker, Job } from 'bullmq'
import dbx from '../lib/dbx'
import IORedis from 'ioredis'

import { redis } from '../config'

export default {
  key: 'SaveFile',
  worker: new Worker(
    'SaveFile',
    async ({ data }: Job) => {
      const jobResult = await dbx.filesUpload({
        contents: Buffer.from(data.buffer),
        path: `/${data.originalname}`,
        mode: { '.tag': 'overwrite' },
        autorename: true,
        mute: true,
      })

      return jobResult
    },
    {
      connection: new IORedis(redis.url),
    }
  ),
}
