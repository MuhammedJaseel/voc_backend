import {
  Injectable,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { SalesController } from './sales/sales.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { SalesService } from './sales/sales.service';
import { AdminsController } from './admins/admins.controller';
import { AdminsService } from './admins/admins.service';

@Module({
  controllers: [
    AdminController,
    AdminsController,
    SalesController,
    UsersController,
  ],
  providers: [
    AdminService,
    AdminsService,
    SalesService,
    UsersService,
    JwtService,
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AmminMiddleware).forRoutes('admin');
  }
}

@Injectable()
class AmminMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  private readonly ADMIN_SECRET =
    process.env.ADMIN_JWT_SECRET || 'default_admin_secret';

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const secret = this.ADMIN_SECRET;
      const token = req.headers['authorization'];
      this.jwtService.verify(token, { secret });
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
