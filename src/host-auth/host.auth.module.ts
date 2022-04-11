import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HostAuthController } from "./host.auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { HostAuthService } from "./host.auth.service";
import { HostJwtStrategy } from "./strategy";
import { HostModule } from "src/host/host.module";

@Module({
    imports: [
        forwardRef(() => HostModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('HOST_JWT_SECRET'),
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],
    controllers: [HostAuthController],
    providers: [HostAuthService, HostJwtStrategy],
}) 
export class HostAuthModule{}