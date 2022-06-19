/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { HostAuthDto } from 'src/host/dto/host.auth';
import { UserJwtGuard } from './guard/user.jwt.guard';
import { User } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')

export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(UserJwtGuard)
  findAll(): Observable<User[]> {
    return this.userService.findAllUsers();
  }
  @Get(':id')
  @UseGuards(UserJwtGuard)
  findOne(@Param('id') id: string): Observable<User> {
    return this.userService.findOne(+id);
  }
  @Post("signup")
  createUser(@Body() user: User) {
    return this.userService.signupUser(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signinUser(@Body() dto: HostAuthDto) {
    return this.userService.signinUser(dto);
  }
}
