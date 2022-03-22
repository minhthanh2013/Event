import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CreateAuthDto } from "./dto/create.dto";
import { role } from "@prisma/client";

@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {
        
    } 
    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username,
            },
        });
        // if user does not exist throw exception
        if(!user) 
            throw new ForbiddenException(
                'Creadentials incorrect',
            );
        // compare password
        const pwMatches = await argon.verify(
            user.password,
            dto.password,
        );
        // if password incorrect throw exception
        if(!pwMatches) 
            throw new ForbiddenException(
                'Creadentials incorrect',
            );

        return this.signToken(user.userID, user.username);
    }

    async signup(dto: CreateAuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try{
            const user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    password: hash,
                    email: dto.email,
                    role: role.ADMIN,
                }
            });
            return this.signToken(user.userID, user.email);
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Creadential taken');
                }
            }
            throw error;
        }
    }

    async signToken(userId: number, username: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            username
        }

        
        const token = await this.jwt.signAsync(
            payload,
        );

        return {
            access_token: token,
        } 
    }
}
