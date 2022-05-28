import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { CreateAuthDto } from "./dto/create.dto";

@Injectable()
export class UserAuthService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,) {}
    async signinUser(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                userName: dto.username,
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

        return this.signToken(user.userID, user.userName, 'user');
    }

    async signupUser(dto: CreateAuthDto) {
        console.log('signupUser - COREAPI', dto);
        // generate the password hash
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try{
            const user = await this.prisma.user.create({
                data: {
                    userName: dto.username,
                    password: hash,
                    email: dto.email,
                }
            });
            return this.signToken(user.userID, user.email, 'user');
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Creadential taken');
                }
            }
            throw error;
        }
    }

    async signToken(userId: number, username: string, role: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            username,
            role,
        }

        
        const token = await this.jwt.signAsync(
            payload,
        );

        return {
            access_token: token,
        } 
    }
}
