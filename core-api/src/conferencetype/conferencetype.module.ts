/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferencetypeController } from './conferencetype.controller';
import { ConferencetypeService } from './conferencetype.service';
import { ConferenceTypeEntity } from './models/conference_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceTypeEntity])],
  controllers: [ConferencetypeController],
  providers: [ConferencetypeService],
})
export class ConferencetypeModule {}
