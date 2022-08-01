/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceController } from './conference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceEntity } from './models/conference.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { HostEntity } from 'src/host/models/host.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceEntity, ConferenceTypeEntity, ConferenceCategoryEntity, UserEntity, HostEntity])],
  providers: [ConferenceService],
  controllers: [ConferenceController],
})
export class ConferenceModule {}
