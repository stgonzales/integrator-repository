import { Worker, Job } from 'bullmq'
import IORedis from 'ioredis'
import Mail from '../lib/mail'
import redisConfig from '../config/redis'

export default {
  key: 'NewAttendeeMail',
  worker: new Worker(
    'NewAttendeeMail',
    async ({ data }: Job) => {
      const { email, first_name, last_name } = data

      await Mail.sendMail({
        from: 'Queue Test <queue@gmail.com>',
        to: `${first_name} ${last_name} <${email}>`,
        subject: 'Confirmacao de registro',
        html: `Ola ${first_name}, seu Registro foi confirmado`,
      })
    },
    {
      connection: new IORedis(redisConfig.url),
    }
  ),
}
