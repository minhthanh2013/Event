/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';

export class UserJwtGuard extends AuthGuard('user-jwt') {
  constructor() {
    super();
  }
}
