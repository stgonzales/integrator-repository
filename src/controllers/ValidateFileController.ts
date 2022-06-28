import { Request, Response } from 'express'
import { validate } from '../utils'

export default class ValidateFileController {
  public async index(req: Request, res: Response): Promise<Response> {
    console.log(req.file)

    if (req.file) {
      const result = await validate(req.file)
      console.log(result)

      return res.sendStatus(200)
    }

    return res.sendStatus(400)
  }
}
