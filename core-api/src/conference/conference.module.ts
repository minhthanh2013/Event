/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceController } from './conference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceEntity } from './models/conference.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { UserEntity } from 'src/user/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceEntity, ConferenceTypeEntity, ConferenceCategoryEntity, UserEntity])],
  providers: [ConferenceService],
  controllers: [ConferenceController],
})
export class ConferenceModule {}
