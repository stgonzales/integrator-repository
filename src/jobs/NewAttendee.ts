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
      const {
        id,
        email,
        first_name,
        last_name,
        order_id,
        emp_cnpj,
        classificacao,
      } = data

      await Mail.sendMail({
        from: 'Queue Test <queue@gmail.com>',
        to: `${first_name} ${last_name} <${email}>`,
        subject: 'Confirmacao de registro',
        html: `Ola ${first_name}, seu Registro foi confirmado`,
      })

      const pool = await new sql.ConnectionPool(dbsettings).connect()
      await pool.query(`
        INSERT INTO integracao_externa
            (n_folha, n_identificador, nome, email, empresa_cnpj, estado, classificacao)
        VALUES ('${order_id}', '${id}', '${first_name} ${last_name}', '${email}', '${emp_cnpj}', '2', '${classificacao}')`)
      pool.close()
    },
    {
      connection: new IORedis(redis.url),
    }
  ),
}
