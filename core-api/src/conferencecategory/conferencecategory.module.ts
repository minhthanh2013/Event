/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferencecategoryController } from './conferencecategory.controller';
import { ConferencecategoryService } from './conferencecategory.service';
import { ConferenceCategoryEntity } from './models/conference_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceCategoryEntity])],
  controllers: [ConferencecategoryController],
  providers: [ConferencecategoryService],
})
export class ConferencecategoryModule {}
