import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from './models/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
