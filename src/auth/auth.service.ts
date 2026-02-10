import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nodemailer } from 'nodemailer';

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

  private readonly ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;
  private readonly ADMIN_SECRET_TEMP = process.env.ADMIN_SECRET_KEY_TEMP;
  private readonly ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(',');

  _generateOTP() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(4, '0');
  }

  async _sendOTPEmail(email: string, otp: string) {
    // TODO: Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
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
    const secret = this.ADMIN_SECRET_TEMP + otp;

    const token = this.jwtService.sign({ email }, { secret, expiresIn: '5m' });

    return { token };
  }

  async adminLogin(body: AdminLoginDto): Promise<AdminLoginResDto> {
    var secret = this.ADMIN_SECRET_TEMP + body.otp;
    try {
      const payload = this.jwtService.verify(body.token, { secret });

      const token = this.jwtService.sign(payload, {
        secret: this.ADMIN_SECRET,
        expiresIn: '1d',
      });

      return { token };
    } catch (error) {
      throw new BadRequestException('Invalid or expired OTP');
    }
  }
}
