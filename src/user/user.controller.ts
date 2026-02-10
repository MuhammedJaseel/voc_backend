import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ConractUsReqDto,
  EnquiryReqDto,
  JoinTeamDto,
  SuccessResDto,
} from './user.dto';
import { Request } from 'express';

@Controller('api/public/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('contact')
  postContact(
    @Req() req: Request,
    @Body() body: ConractUsReqDto,
  ): Promise<SuccessResDto> {
    return this.userService.addContact(req, body);
  }

  @Post('enquiry')
  postEnquiry(
    @Req() req: Request,
    @Body() body: EnquiryReqDto,
  ): Promise<SuccessResDto> {
    return this.userService.postEnquiry(req, body);
  }

  @Post('join-team')
  postJoinTeam(
    @Req() req: Request,
    @Body() body: JoinTeamDto,
  ): Promise<SuccessResDto> {
    return this.userService.postJoinTeam(req, body);
  }
}
