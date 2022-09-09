import { Module } from '@nestjs/common';
import { AnalyticService } from './analytic.service';
import { AnalyticController } from './analytic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticEntity } from './models/analytic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticEntity])],
  providers: [AnalyticService],
  controllers: [AnalyticController],
})
export class AnalyticModule {}
