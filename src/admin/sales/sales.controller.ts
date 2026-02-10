import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller("api/admin/sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  getHello(): string {
    return this.salesService.getHello();
  }
}
