import { mssql } from '.'

const { user, password, server, database } = mssql

export default {
  user,
  password,
  database,
  server,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: false,
    trustedConnection: true,
  },
}
