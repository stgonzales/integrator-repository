import { Job } from 'bull'
import Mail from '../lib/mail'

export default {
  key: 'NewAttendeeMail',
  async handle({ data }: Job) {
    const { email, first_name, last_name } = data

    await Mail.sendMail({
      from: 'Queue Test <queue@gmail.com>',
      to: `${first_name} ${last_name} <${email}>`,
      subject: 'Confirmacao de registro',
      html: `Ola ${first_name}, seu Registro foi confirmado`,
    })
  },
}
