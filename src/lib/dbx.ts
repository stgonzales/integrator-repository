import { Dropbox } from 'dropbox'
import { dropbox } from '../config'

const dbx = new Dropbox({
  accessToken: dropbox.secret,
})

export default dbx
