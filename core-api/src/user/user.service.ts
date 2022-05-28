import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,) {}

    async editUser(userId: number, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: {
                userID: userId,
            },
            data: {
                ...dto,
            },
        });
        delete user.password;
        return user;
    }

    getAll() {
        const users = this.prisma.user.findMany({
            select:{
                userID:true,
                userName: true,
                firstName: true,
                lastName: true,
                email: true,
                createAt: true,
            }
        });
        return users;
    }

    findOne(userID: number) {
        const user = this.prisma.user.findUnique({
            where: {
                userID: userID,
            }
        });
        return user;
    }
}
