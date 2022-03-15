import {IsNotEmpty, IsString} from 'class-validator';
export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    UserName: string;

    @IsString()
    @IsNotEmpty()
    Password: string;
}