import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceController } from './conference.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ConferenceService],
  controllers: [ConferenceController]
})
export class ConferenceModule {}
