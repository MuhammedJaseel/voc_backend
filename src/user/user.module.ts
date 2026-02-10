import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Enquiry, EnquirySchema } from 'src/schemas/users.schema';
import { MailerService } from 'src/commen/mailer.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MailerService],
  imports: [
    MongooseModule.forFeature([{ name: Enquiry.name, schema: EnquirySchema }]),
  ],
})
export class UserModule {}
