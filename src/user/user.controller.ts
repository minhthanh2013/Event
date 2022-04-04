import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
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

    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    findAll() {
        return this.userService.getAll();
    }

    @Get(':userID')
    getUserByUsername(
        @GetUser('userID') userID: number)
    {
        return this.userService.findOne(userID);
    }
}
