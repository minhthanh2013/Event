import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthDto } from "./dto";
import { CreateAuthDto } from "./dto/create.dto";
import { HostAuthService } from "./host.auth.service";

@Controller('auth')
export class HostAuthController{
    constructor(private hostAuthService: HostAuthService) {}

    @Post('hosts/signup')
    signupUser(@Body() dto: CreateAuthDto) {
        return this.hostAuthService.signupHost(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('hosts/signin')
    signinUser(@Body() dto: AuthDto) {
        return this.hostAuthService.signinHost(dto);
    }
}