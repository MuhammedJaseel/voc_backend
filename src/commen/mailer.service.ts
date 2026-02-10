
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly MAILER_EMAIL = process.env.MAILER_EMAIL;
  private readonly MAILER_PASSWORD = process.env.MAILER_PASSWORD;
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.MAILER_EMAIL,
        pass: this.MAILER_PASSWORD,
      },
    });
  }

  async sendMail(email: string, subject: string, body: string) {
    const mailOptions = {
      from: this.MAILER_EMAIL,
      to: email,
      subject,
      html: body,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}
