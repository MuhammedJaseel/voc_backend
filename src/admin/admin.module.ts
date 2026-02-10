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
import { MongooseModule } from '@nestjs/mongoose';
import { Enquiry, EnquirySchema } from 'src/schemas/users.schema';

@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtService],
  imports: [
    MongooseModule.forFeature([{ name: Enquiry.name, schema: EnquirySchema }]),
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AmminMiddleware).forRoutes('api/admin/*');
  }
}

@Injectable()
class AmminMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  private readonly ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;

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
