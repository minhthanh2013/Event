import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class HostJwtStrategy extends PassportStrategy(
    Strategy,
    'host-jwt',) {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('HOST_JWT_SECRET'),
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
            const host = 
            await this.prisma.host.findUnique({
                where: {
                    hostID: payload.sub,
                }
            });
        delete host.password;
        return host;
    }
}