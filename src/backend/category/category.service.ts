import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from '../user/user.service';

@Injectable()
export class CategoryService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
    ) {}

    async createCategory(dto: any) {
        
    }
}
