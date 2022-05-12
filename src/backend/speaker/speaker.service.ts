import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';


@Injectable()
export class SpeakerService {
    constructor(
        private prisma: PrismaService) {}
 findAll() {
    return `This action find all speakers`;
  }

  findOne(id: number) {
    const speaker = this.prisma.speaker.findUnique({
      where: {
          speakerID: id,
      }
  });
  return speaker;
  }

  update(id: number, updateSpeakerDto: UpdateSpeakerDto) {
    return `This action updates a #${id} speaker`;
  }

  remove(id: number) {
    return `This action removes a #${id} speaker`;
  }
}
