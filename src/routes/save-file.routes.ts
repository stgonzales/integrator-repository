import { Request, Response, Router } from 'express'

const route = Router()

route.post('/', (req: Request, res: Response) => {
  return res.send('save file endpoint')
})

export default route
