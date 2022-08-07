import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { CombosessionController } from './combosession.controller';
import { CombosessionService } from './combosession.service';
import { ComboSessionEntity } from './models/combo_session.entiy';

@Module({
  imports: [TypeOrmModule.forFeature([ComboSessionEntity, ConferenceEntity])],
  controllers: [CombosessionController],
  providers: [CombosessionService],
})
export class CombosessionModule {}
