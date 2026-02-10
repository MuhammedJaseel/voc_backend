import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  AdminLoginDto,
  AdminLoginResDto,
  UserLoginReqDto,
  UserLoginResDto,
  UserOtpReqDto,
  UserRegReqDto,
  UserRegResDto,
  VerifyAdminDto,
  VerifyAdminResDto,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('user/verify')
  // async userVerify(@Body() body: UserLoginReqDto): Promise<UserLoginResDto> {
  //   return this.authService.userVerify(body);
  // }

  // @Post('user/login')
  // async userLogin(@Body() body: UserRegReqDto): Promise<UserRegResDto> {
  //   return this.authService.userLogin(body);
  // }

  // @Post('user/register')
  // async userReg(@Body() body: UserOtpReqDto) {
  //   return this.authService.userReg(body);
  // }

  // ///////////////////////////////////////

  @Post('admin/verify')
  async adminVerify(@Body() body: VerifyAdminDto): Promise<VerifyAdminResDto> {
    return this.authService.adminVerify(body);
  }

  @Post('admin/login')
  async adminLogin(@Body() body: AdminLoginDto): Promise<AdminLoginResDto> {
    return this.authService.adminLogin(body);
  }
}
