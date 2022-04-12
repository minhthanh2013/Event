import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy,'user-jwt',) 
{
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: {
        sub: number,
        username: string,
        role: string,
    }) {
            if(payload.role != null && payload.role != 'user') {
                throw new UnauthorizedException('Unauthorized');
            }
            const user = 
            await this.prisma.user.findUnique({
                where: {
                    userID: payload.sub,
                }
            });
        delete user.password;
        return user;
    }
}