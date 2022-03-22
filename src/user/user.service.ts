import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private redis: RedisCacheService) {}

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
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                createAt: true,
                role: true,
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
