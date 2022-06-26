import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService, ConfigModule],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
