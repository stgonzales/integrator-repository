import { Request, Response } from 'express'
import sql from 'mssql'
import dbsettings from '../config/db'
import dbx from '../lib/dbx'

export default class CheckDetailsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { ticket_number, email } = req.body

    try {
      const pool = await new sql.ConnectionPool(dbsettings).connect()
      const result = await pool.query(
        `SELECT id, n_identificador, n_folha, nome, email FROM pessoas WHERE n_folha = '${ticket_number}' AND email = '${email}'`
      )

      console.log(result.recordset)

      // if (result.recordset.length <= 0) return res.status(404)

      // const files = await dbx.filesListFolder({
      //   path: '',
      //   recursive: false,
      //   include_deleted: false,
      //   include_has_explicit_shared_members: false,
      //   include_mounted_folders: false,
      //   include_non_downloadable_files: false,
      // })

      // const file = files.result.entries.find(
      //   (e) => e.name.split('-')[0] === result.recordset[0].id.toString()
      // )

      // if (!file) return res.status(200).json(result.recordset)
      // else return res.status(404)
      return res.status(200).json(result.recordset)
    } catch (err) {
      console.log(err)
      return res.status(404).json(err)
    }
  }
}
