import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SuccessResDto, UpdateEnquiryReqDto } from './admin.dto';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  getAdmin(): Promise<any> {
    return this.adminService.getAdmin();
  }

  @Get('home')
  getHome(): Promise<any> {
    return this.adminService.getHome();
  }

  @Get('enquiries')
  getEnquiries(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('type') type: string,
  ): Promise<any> {
    return this.adminService.getEnquiries(page, limit, type);
  }

  @Patch('enquiries/:id')
  updateEnquiries(
    @Param('id') id: string,
    @Body() body: UpdateEnquiryReqDto,
  ): Promise<SuccessResDto> {
    return this.adminService.updateEnquiries(id, body);
  }
}
