import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  AdminLoginDto,
  AdminLoginResDto,
  VerifyAdminDto,
  VerifyAdminResDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private readonly USER_SECRET =
    process.env.USER_JWT_SECRET || 'default_admin_secret';
  private readonly ADMIN_SECRET =
    process.env.ADMIN_JWT_SECRET || 'default_admin_secret';
  private readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'example@gmail.com';

  _generateOTP() {
    return '123456';
    // return Math.floor(Math.random() * 1000000)
    //   .toString()
    //   .padStart(6, '0');
  }

  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////

  async adminVerify(body: VerifyAdminDto): Promise<VerifyAdminResDto> {
    if (body.email === this.ADMIN_EMAIL) {
      const otp = this._generateOTP();

      const secret = this.ADMIN_SECRET + otp;
      return { token: this.jwtService.sign({}, { secret, expiresIn: '5m' }) };
    }
    throw new NotFoundException('Not a valid admin');
  }

  async adminLogin(body: AdminLoginDto): Promise<AdminLoginResDto> {
    var secret = this.ADMIN_SECRET + body.otp;
    try {
      this.jwtService.verify(body.token, { secret });
      secret = this.ADMIN_SECRET;
      return {
        token: this.jwtService.sign({}, { secret, expiresIn: '1d' }),
      };
    } catch (error) {
      throw new BadRequestException('Invalid or expired OTP');
    }
  }
}
