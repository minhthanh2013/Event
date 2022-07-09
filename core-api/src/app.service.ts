/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS') private readonly redisClient: ClientProxy,
    @Inject('ZOOM') private readonly zoomClient: ClientProxy,
    @Inject('PAYMENT') private readonly paymentClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
}
