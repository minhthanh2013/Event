import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUsers();
  }
}
