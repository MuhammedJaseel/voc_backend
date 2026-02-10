import { Injectable } from '@nestjs/common';
import {
  ConractUsReqDto,
  EnquiryReqDto,
  JoinTeamDto,
  SuccessResDto,
} from './user.dto';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Enquiry } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { MailerService } from 'src/commen/mailer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>,
    private readonly mailerService: MailerService,
  ) {}

  _getIp(req: Request): string {
    return (
      req?.headers['x-forwarded-for']?.toString().split(',')[0] ||
      req?.socket?.remoteAddress
    );
  }

  _sendEmail(body: any) {
    const date = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
    });

    const html = `Name: ${body?.name}<br/>Phone: ${body?.phone}<br/>Email: ${body?.email}<br/>Purpose: ${body?.msg}<br/>${date}`;
    const subj = 'New contact form submission';

    try {
      this.mailerService.sendMail('jaseelmanamulli@gmail.com', subj, html);
      // this.mailerService.sendMail('arakkalfaris@gmail.com', subj, html);
      // this.mailerService.sendMail('info@vocindia.net', subj, html);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }

  async addContact(
    req: Request,
    body: ConractUsReqDto,
  ): Promise<SuccessResDto> {
    const ip = this._getIp(req);
    this._sendEmail(body);

    await this.enquiryModel.create({
      name: body.name,
      email: body.email,
      msg: body.msg,
      type: 'CONTACT',
      ip,
    });
    return { success: true };
  }

  async postEnquiry(req: Request, body: EnquiryReqDto): Promise<SuccessResDto> {
    const ip = this._getIp(req);
    this._sendEmail(body);

    await this.enquiryModel.create({
      name: body.name,
      email: body.email,
      msg: body.msg,
      type: 'ENQUIRY',
      ip,
    });
    return { success: true };
  }

  async postJoinTeam(req: Request, body: JoinTeamDto): Promise<SuccessResDto> {
    const ip = this._getIp(req);
    this._sendEmail(body);

    await this.enquiryModel.create({
      name: body.name,
      email: body.email,
      msg: body.msg,
      type: 'JOIN_TEAM',
      ip,
    });
    return { success: true };
  }
}
