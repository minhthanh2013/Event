import { Module } from '@nestjs/common';

import { RedisCacheModule } from '../redis/redis.module';
import { UserAuthModule } from '../user-auth/user.auth.module';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [RedisCacheModule, UserAuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
