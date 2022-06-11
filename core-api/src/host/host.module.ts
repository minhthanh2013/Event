import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from './models/host.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HostEntity])],
  providers: [HostService],
  controllers: [HostController],
})
export class HostModule {}
