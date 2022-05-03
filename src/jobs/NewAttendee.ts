import { Worker, Job } from 'bullmq'
import sql from 'mssql'
import IORedis from 'ioredis'

import Mail from '../lib/mail'
import { redis } from '../config'
import dbsettings from '../config/db'

export default {
  key: 'NewAttendee',
  worker: new Worker(
    'NewAttendee',
    async ({ data }: Job) => {
      const { email, first_name, last_name, order_id, qrcode } = data

      await Mail.sendMail({
        from: 'Queue Test <queue@gmail.com>',
        to: `${first_name} ${last_name} <${email}>`,
        subject: 'Confirmacao de registro',
        html: `Ola ${first_name}, seu Registro foi confirmado`,
      })

      const pool = await new sql.ConnectionPool(dbsettings).connect()
      const result = await pool.query(`
        INSERT INTO integracao_externa
            (n_folha, n_identificador, nome, email)
        VALUES ('${order_id}', '${qrcode}', '${first_name} ${last_name}', '${email}')`)
      console.log(result)
    },
    {
      connection: new IORedis(redis.url),
    }
  ),
}
