/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { HostAuthDto } from 'src/host/dto/host.auth';
import { UserJwtGuard } from './guard/user.jwt.guard';
import { User, UserResponseDto } from './models/user.interface';
import { UserService } from './user.service';
import { ResponseData } from 'src/responsedata/response-data.dto';

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
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
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

  @Put(':id')
  @UseGuards(UserJwtGuard)
  updateUser(@Param('id') id: string, @Body() user: UserResponseDto): Promise<ResponseData> {
    return this.userService.updateUser(+id, user);
  }
}