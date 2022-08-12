import { TicketEntity } from 'src/ticket/models/ticket.entity';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { HttpModule } from '@nestjs/axios';
import { ConferenceController } from './conference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceEntity } from './models/conference.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { ZoomService } from 'src/zoom/zoom.service';
import { ZoomModule } from 'src/zoom/zoom.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceEntity, ConferenceTypeEntity, ConferenceCategoryEntity, UserEntity, HostEntity, TicketEntity]),
  ZoomModule,
  HttpModule,
  CloudinaryModule,
  ClientsModule.register([
      {
        name: 'ZOOM',
        transport: Transport.TCP,
        options: {
          host: 'zoom',
          port: 3001,
        }
      }
    ])
],
  providers: [ConferenceService, ZoomService, CloudinaryService],
  controllers: [ConferenceController],
})
export class ConferenceModule {}
