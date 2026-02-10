import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEnquiryReqDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  statusMsg: string;
}

export interface SuccessResDto {
  success: boolean;
}
