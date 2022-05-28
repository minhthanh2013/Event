import { Module } from '@nestjs/common';

import { UserAuthModule } from '../user-auth/user.auth.module';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserAuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
