export const redis = {
  url: process.env.REDIS_URL || '',
  maxRetriesPerRequest: null,
}

export const mssql = {
  user: process.env.SQLSERVER_USER || '',
  password: process.env.SQLSERVER_PWD || '',
  database: process.env.SQLSERVER_DBNAME || '',
  server: process.env.SQLSERVER_SERVER || '',
  port: parseInt(process.env.SQLSERVER_PORT || ''),
}

export const mailConfig = {
  host: process.env.MAIL_HOST || '',
  port: parseInt(process.env.MAIL_PORT || ''),
  auth: {
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
  },
  options: {
    encrypt: true,
  },
}

export const secret = {
  token: process.env.ACCESS_TOKEN_SECRET || '',
}

export const dropbox = {
  secret: process.env.DBX_SECRET || '',
}
