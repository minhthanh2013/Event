/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class HostAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
