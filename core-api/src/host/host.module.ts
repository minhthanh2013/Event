import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { HostAuthModule } from '../host-auth/host.auth.module';


@Module({
  imports: [HostAuthModule],
  controllers: [HostController],
  providers: [HostService],
  exports: [HostService],
})
export class HostModule {}
