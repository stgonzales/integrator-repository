import { Request, Response } from 'express'
import Queue from '../lib/queue'

export default class NewEntryController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { eventName, attendee } = req.body

    // TODO: Trigger add email to queue
    await Queue.add(eventName, attendee)

    // TODO: Save entry to db(SQLSERVER)

    return res.sendStatus(200)
  }
}
