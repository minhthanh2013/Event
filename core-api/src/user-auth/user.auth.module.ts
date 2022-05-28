import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserAuthService } from "./user.auth.service";
import { UserJwtStrategy } from "./strategy";
import { UserAuthController } from "./user.auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";



@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],
    controllers: [UserAuthController],
    providers: [UserAuthService, UserJwtStrategy],
}) 
export class UserAuthModule{}