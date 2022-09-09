import { Module } from '@nestjs/common';
import { PopularityService } from './popularity.service';
import { PopularityController } from './popularity.controller';
import { PopularityEntity } from './Model/popularity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ConferenceEntity,
      PopularityEntity,
      ConferenceCategoryEntity,
    ]),
  ],
  controllers: [PopularityController],
  providers: [PopularityService],
})
export class PopularityModule {}
