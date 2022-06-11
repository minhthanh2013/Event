import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { SpeakerController } from './speaker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakerEntity } from './models/speaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeakerEntity])],
  providers: [SpeakerService],
  controllers: [SpeakerController],
})
export class SpeakerModule {}
