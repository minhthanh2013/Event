import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserAuthService } from "./user.auth.service";
import { UserJwtStrategy } from "./strategy";
import { UserAuthController } from "./user.auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { ClientsModule, Transport } from "@nestjs/microservices";

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
        }),
        ClientsModule.register([
            {
              name: 'REDIS',
              transport: Transport.TCP,
            },
            {
              name: 'ZOOM',
              transport: Transport.TCP,
              options: {
                port: 3001,
              }
            }
          ])
        ],
    controllers: [UserAuthController],
    providers: [UserAuthService, UserJwtStrategy],
}) 
export class UserAuthModule{}