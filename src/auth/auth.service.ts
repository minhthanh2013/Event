import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CreateAuthDto } from "./dto/create.dto";
import { Role } from "@prisma/client";

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
                UserName: dto.UserName,
            },
        });
        // if user does not exist throw exception
        if(!user) 
            throw new ForbiddenException(
                'Creadentials incorrect',
            );
        // compare password
        const pwMatches = await argon.verify(
            user.Password,
            dto.Password,
        );
        // if password incorrect throw exception
        if(!pwMatches) 
            throw new ForbiddenException(
                'Creadentials incorrect',
            );

        return this.signToken(user.UserID, user.Email);
    }

    async signup(dto: CreateAuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.Password);
        // save the new user in the db
        try{
            const user = await this.prisma.user.create({
                data: {
                    UserID: "1",
                    UserName: dto.UserName,
                    Password: hash,
                    Email: "123@gmail.com",
                    Role: Role["ADMIN"],
                }
            });
            return this.signToken(user.UserID, user.Email);
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Creadential taken');
                }
            }
            throw error;
        }
    }

    async signToken(userId: string, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        }

        
        const token = await this.jwt.signAsync(
            payload,
        );

        return {
            access_token: token,
        } 
    }
}
