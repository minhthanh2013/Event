import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateConferenceDTO } from '../conference/dto';
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from '../user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


@Injectable()
export class ConferenceService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService) {
    } 

    async createConference(dto: CreateConferenceDTO) {
        const user = this.userService.findOne(1);
        try{
           const conference = await this.prisma.conference.create({
                data: {
                    userID: (await user).userID,
                    categoryID: 1,
                    typeID: 1,
                    methodID: 1,  
                    conferenceName: dto.conferenceName,
                    ticketPrice: ,
                    dateStart: dto.dateStart,
                    dateEnd: dto.dateEnd,
                }
           })
            return conference;
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Creadential taken');
                }
            }
            throw error;
        }
    }
}
