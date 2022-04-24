import { Request, Response, Router } from 'express'

const route = Router()

route.post('/', (req: Request, res: Response) => {
  console.log(req.body)
  return res.sendStatus(200)
})

export default route
