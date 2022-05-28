import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdateHostDto } from '../host/dto/update-host.dto';
import { UserJwtGuard } from '../user-auth/guard';
import { SpeakerService } from './speaker.service';

@UseGuards(UserJwtGuard)
@Controller('speaker')
export class SpeakerController {
    constructor(private speakerService: SpeakerService) {}
    @Get()
  findAll() {
    return this.speakerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speakerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostDto: UpdateHostDto) {
    return this.speakerService.update(+id, updateHostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speakerService.remove(+id);
  }
}
