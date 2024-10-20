import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      from: process.env.SMTP_USER, 
      subject,
      html,
    });
  }

  async sendActivationEmail(email: string, token: string): Promise<void> {
    const href = `${process.env.CLIENT_URL}/activate/${token}`;
    const html = `
      <h1>Activate account:</h1>
      <a href="${href}">${href}</a>
    `;
    await this.sendMail(email, 'Activate your account', html);
  }
}
