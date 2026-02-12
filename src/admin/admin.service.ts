import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Enquiry } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { SuccessResDto, UpdateEnquiryReqDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>,
  ) {}

  async getAdmin(): Promise<any> {
    return { name: 'Admin', type: 'admin' };
  }

  async getHome(): Promise<any> {
    const contactQ = { type: 'CONTACT', status: 'NEW' };
    const contact = {
      total: await this.enquiryModel.countDocuments(contactQ),
      unattend: await this.enquiryModel.countDocuments(contactQ),
    };

    const enquiryQ = { type: 'ENQUIRY', status: 'NEW' };
    const enquiry = {
      total: await this.enquiryModel.countDocuments(enquiryQ),
      unattend: await this.enquiryModel.countDocuments(enquiryQ),
    };

    const joinTeamQ = { type: 'JOIN_TEAM', status: 'NEW' };
    const joinTeam = {
      total: await this.enquiryModel.countDocuments(joinTeamQ),
      unattend: await this.enquiryModel.countDocuments(joinTeamQ),
    };

    return { contact, enquiry, joinTeam };
  }

  async getEnquiries(page: string, limit: string, type: string): Promise<any> {
    if (!page) page = '1';
    if (!limit) limit = '50';
    if (!type) type = 'ALL';

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const query: any = {};
    if (type !== 'ALL') query.type = type;

    const data = await this.enquiryModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .projection('name email phone createdAt status type statusMsg')
      .exec();

    const total = await this.enquiryModel.countDocuments(query);

    return { data, page, limit, total };
  }

  async updateEnquiries(
    id: string,
    body: UpdateEnquiryReqDto,
  ): Promise<SuccessResDto> {
    await this.enquiryModel.findByIdAndUpdate(id, body).exec();
    return { success: true };
  }
}
