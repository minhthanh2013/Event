/* eslint-disable prettier/prettier */
import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
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

    @Get('get-image')
    getImage() {
        return this.cloudinaryService.getImage();
    }
}
