import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './user-dto/create.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('COREAPI') private readonly coreAPIClient: ClientProxy,
  ) {}

  async createUser(dto: CreateAuthDto) {
   return await this.coreAPIClient.emit('user_created', dto);
  }
}
