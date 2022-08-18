/* eslint-disable prettier/prettier */
import { Controller, Get, Post, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
@Controller('cloudinary')
export class CloudinaryController {
    constructor(private cloudinaryService: CloudinaryService) {}


    @Post('upload-image')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
      return this.cloudinaryService.uploadImageToCloudinary(file);
    }

    @Post('upload-video')
    @UseInterceptors(FileInterceptor('file'))
    uploadVideo(@UploadedFile() file: Express.Multer.File) {
        return this.cloudinaryService.uploadVideoToCloudinary(file);
    }

    @Post('upload-video-by-path')
    @UseInterceptors(FileInterceptor('file'))
    uploadVideoByPath(@UploadedFile() file: Express.Multer.File) {
        return this.cloudinaryService.uploadVideoToCloudinary(file);
    }

    @Get('get-conference-image/:imageId')
    getImageUrl(@Param('imageId') imageId: number) {
        return this.cloudinaryService.getImage(imageId);
    }
    @Get('get-combo-image/:imageId')
    getComboImageUrl(@Param('imageId') imageId: number) {
        return this.cloudinaryService.getComboImage(imageId);
    }

    @Get('get-conference-record/:recordId')
    getRecordUrl(@Param('recordId') videoId: string) {
        return this.cloudinaryService.getVideo(videoId);
    }

}
