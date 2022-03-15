import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../redis/redis.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [RedisCacheModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
