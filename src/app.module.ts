import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: '',
        dbName: 'brand_db',
      }),
    }),
    UserModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
