import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3588576071ed24",
    pass: "53ca394522a8a6",
  },
});

export class NodemailerMailProvider implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@fidget.com>",
      to: "João Victor <joaovr.costa@gmail.com>",
      subject,
      html: body,
    });
  }
}
