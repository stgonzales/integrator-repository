import IORedis from 'ioredis'
import { redis } from '.'

export default new IORedis(redis.url)
