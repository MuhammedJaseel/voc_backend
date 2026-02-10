import { Controller, Get } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('api/admin/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  getHello(): string {
    return this.adminsService.getHello();
  }
}
