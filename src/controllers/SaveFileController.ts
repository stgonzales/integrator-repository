import Queue from '../lib/queue'
import { Request, Response } from 'express'

export default class SaveFileController {
  public async index(req: Request, res: Response): Promise<Response> {
    const file = req.file
    const { fileName } = req.body

    if (file) {
      file.originalname = `${fileName}.${file.mimetype.split('/')[1]}`

      await Queue.add('SaveFile', file)

      return res.sendStatus(200)
    }

    return res.sendStatus(400)
  }
}
