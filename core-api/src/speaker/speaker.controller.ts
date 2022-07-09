/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { SpeakerService } from './speaker.service';

@Controller('speaker')
export class SpeakerController {
  constructor(private speakerService: SpeakerService) {}
}
