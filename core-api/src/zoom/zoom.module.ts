/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ZoomController } from './zoom.controller';
import { ZoomService } from './zoom.service';

@Module({
  imports: [
    ClientsModule.register([
        {
          name: 'ZOOM',
          transport: Transport.TCP,
          options: {
            port: 3001,
          }
        }
      ])
  ],
  providers: [ZoomService, CloudinaryService],
  controllers: [ZoomController],
})
export class ZoomModule {}
