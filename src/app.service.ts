import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'VOC API \n Version v0.0.4';
  }
}
