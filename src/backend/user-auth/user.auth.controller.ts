import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserAuthService } from "./user.auth.service";
import { AuthDto } from "./dto";
import { CreateAuthDto } from "./dto/create.dto";

@Controller('auth')
export class UserAuthController{
    constructor(private userAuthService: UserAuthService) {}

    @Post('users/signup')
    signupUser(@Body() dto: CreateAuthDto) {
        return this.userAuthService.signupUser(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('users/signin')
    signinUser(@Body() dto: AuthDto) {
        return this.userAuthService.signinUser(dto);
    }
}