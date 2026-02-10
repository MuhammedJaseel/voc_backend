import {
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserLoginReqDto {
  @IsString()
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  sign: string;

  @IsString()
  @IsNotEmpty()
  msg: string;
}

export interface UserLoginResDto {
  registerd: boolean;
  token?: string;
}

export class UserRegReqDto {
  @IsEthereumAddress()
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export interface UserRegResDto {
  token: string;
}

export class UserOtpReqDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export interface UserOtpResDto {
  token: string;
}

export class VerifyAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class VerifyAdminResDto {
  token: string;
}

export class AdminLoginResDto {
  token: string;
}
