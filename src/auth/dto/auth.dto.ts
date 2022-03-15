import { IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
    @IsString()
    @IsNotEmpty()
    UserName: string;

    @IsString()
    @IsNotEmpty()
    Password: string;
}