/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { SpeakerResponseDto } from './models/speaker.interface';
import { SpeakerService } from './speaker.service';

@Controller('speaker')
export class SpeakerController {
  constructor(
    private speakerService: SpeakerService) {}
    
    @Get("/:uuid")
    findSpeakerByUuid(@Param("uuid") uuid: string): Promise<SpeakerResponseDto> {
      return this.speakerService.checkSpeakerByUuid(uuid);
    }
    
}
