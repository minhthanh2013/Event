/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';

export class AdminJwtGuard extends AuthGuard('admin-jwt') {
  constructor() {
    super();
  }
}
