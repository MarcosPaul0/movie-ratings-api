import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface SendConfirmationMailDto {
  email: string;
  name: string;
  url: string;
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendConfirmationMail({ email, name, url }: SendConfirmationMailDto) {
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_LOGIN,
      subject: 'Movie Rating | Confirmação',
      template: '../mail/template/confirmation',
      context: {
        name,
        url,
      },
    });
  }
}
