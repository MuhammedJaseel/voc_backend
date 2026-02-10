import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
