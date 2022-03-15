import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private redis: RedisCacheService) {}

    async editUser(userId: string, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: {
                UserID: userId,
            },
            data: {
                ...dto,
            },
        });
        delete user.Password;
        return user;
    }

    getAll() {
        const users = this.prisma.user.findMany({
            select:{
                UserID:true,
                UserName: true,
                FirstName: true,
                LastName: true,
                Email: true,
                CreateAt: true,
                Role: true,
            }
        });
        return users;
    }

    findOne(id: string) {
        const user = this.prisma.user.findUnique({
            where: {
                UserID: id,
            },
        });
        return user;
    }
}
