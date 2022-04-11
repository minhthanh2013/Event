import { Module } from '@nestjs/common';
import { UserAuthModule } from 'src/user-auth/user.auth.module';
import { RedisCacheModule } from '../redis/redis.module';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [RedisCacheModule, UserAuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
