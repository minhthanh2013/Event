import { IsEmail, IsOptional, IsString } from "class-validator"

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    Email?: string
    @IsString()
    @IsOptional()
    FirstName?: string
    @IsString()
    @IsOptional()
    LastName?: string
}