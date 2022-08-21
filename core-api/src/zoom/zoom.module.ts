/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { ZoomController } from './zoom.controller';
import { ZoomProcessor } from './zoom.processor';
import { ZoomService } from './zoom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConferenceEntity]),
    BullModule.registerQueue({
      name: 'zoom',
    }),
    HttpModule,
    ConfigModule,
    ClientsModule.register([
        {
          name: 'ZOOM',
          transport: Transport.TCP,
          options: {
            // host: 'zoom',
            port: 3001,
          }
        }
      ])
  ],
  providers: [ZoomService, CloudinaryService, ConfigModule, ZoomProcessor],
  controllers: [ZoomController],
})
export class ZoomModule {}
