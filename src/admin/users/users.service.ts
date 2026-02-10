import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHello(): string {
    return 'Hello World! v0.0.1';
  }
}
