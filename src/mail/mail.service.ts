import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './send-mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(sendMailDto: SendMailDto): Promise<any> {
    try {
      return this.mailerService.sendMail({
        to: sendMailDto.to,
        subject: sendMailDto.subject,
        html: sendMailDto.html,
        template: sendMailDto.template,
        context: sendMailDto.context,
        attachments: sendMailDto.attachments,
      });
    } catch (error) {
      return null;
    }
  }
}
