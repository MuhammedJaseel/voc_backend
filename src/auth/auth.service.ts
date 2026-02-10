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
import { MailerService } from 'src/commen/mailer.service';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  private readonly ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;
  private readonly ADMIN_SECRET_TEMP = process.env.ADMIN_SECRET_KEY_TEMP;
  private readonly ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(',');

  _generateOTP() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(4, '0');
  }

  async _sendOTPEmail(email: string, otp: string) {
    try {
      this.mailerService.sendMail(
        email,
        'Your OTP Code',
        `<p>Your OTP code is: <strong>${otp}</strong></p>`,
      );
    } catch (error) {
      console.error('Failed to send OTP email:', error);
    }
  }

  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////

  async adminVerify(body: VerifyAdminDto): Promise<VerifyAdminResDto> {
    const result = this.ADMIN_EMAILS.indexOf(body.email);

    if (result === -1) throw new NotFoundException('Not a valid admin');
    if (!this.ADMIN_SECRET_TEMP)
      throw new NotFoundException('Admin OTP not set');

    const email = body.email;
    const otp = this._generateOTP();

    await this._sendOTPEmail(email, otp);

    const secret = this.ADMIN_SECRET_TEMP + otp;

    const token = this.jwtService.sign({ email }, { secret, expiresIn: '5m' });

    return { token };
  }

  async adminLogin(body: AdminLoginDto): Promise<AdminLoginResDto> {
    var secret = this.ADMIN_SECRET_TEMP + body.otp;
    try {
      const payload = this.jwtService.verify(body.token, { secret });

      console.log(payload);

      const token = this.jwtService.sign(
        { email: payload.email },
        {
          secret: this.ADMIN_SECRET,
          expiresIn: '1d',
        },
      );

      return { token };
    } catch (error) {
      console.error('Admin login failed:', error);
      throw new BadRequestException('Invalid or expired OTP');
    }
  }
}
