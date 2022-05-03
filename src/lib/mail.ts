import nodemailer from 'nodemailer'
import { mailConfig } from '../config'

export default nodemailer.createTransport(mailConfig)
