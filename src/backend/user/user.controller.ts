import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../user-auth/decorator/get-user.decorator';


import { UserJwtGuard } from '../user-auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
@UseGuards(UserJwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto) 
    {
            return this.userService.editUser(userId, dto);
    }
    
    @Get()
    findAll() {
        console.log('before findAll');
        return this.userService.getAll();
    }

    @Get(':userID')
    getUserByUsername(
        @GetUser('userID') userID: number)
    {
        return this.userService.findOne(userID);
    }
}
