import {  IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateConferenceDTO {
    @IsString()
    @IsNotEmpty()
    conferenceName: string;

    @IsString()
    @IsNotEmpty()
    ticketPrice: number;

    @IsDateString()
    @IsNotEmpty()
    dateStart: Date;

    @IsDateString()
    @IsNotEmpty()
    dateEnd: Date;
}