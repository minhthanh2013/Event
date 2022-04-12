import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateConferenceDTO } from '../conference/dto';
import { ConferenceService } from '../conference/conference.service';

@Controller('conference')
export class ConferenceController {
    constructor(private conferenceService: ConferenceService) {}
    // @Get()
    // getAllConferences() {
    //     return this.conferenceService.findAll();
    // }

    // @Get(':id')
    // getConferenceById(@Param()conferenceId : string) {
    //     return this.conferenceService.findOne(conferenceId);
    // }

    @Post()
    createConference(@Body() dto: CreateConferenceDTO) {
        return this.conferenceService.createConference(dto);
    }

    // @Patch()
    // editConferenceById() 
    // {
    //         return this.conferenceService.editConference(conferenceId, dto);
    // }
}
