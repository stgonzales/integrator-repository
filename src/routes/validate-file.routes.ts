import { Request, Response, Router } from 'express'

const route = Router()

route.post('/', (req: Request, res: Response) => {
  return res.send('validate file endpoint')
})

export default route
