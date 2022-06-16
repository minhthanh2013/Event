/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  // constructor(
  //   @Inject('REDIS') private readonly redisClient: ClientProxy,
  //   @Inject('ZOOM') private readonly zoomClient: ClientProxy,
  // ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // handleCreateUser(dto: any) {
  //   console.log('here in core-api');
  //   this.redisClient.emit(
  //     'user_created',
  //     dto,
  //   );
  //   this.zoomClient.emit(
  //     'user_created',
  //     dto,
  //   );
  // }

}
