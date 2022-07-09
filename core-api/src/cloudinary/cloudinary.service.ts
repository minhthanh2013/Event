/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
// This is a hack to make Multer available in the Express namespace
import { Multer } from 'multer';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({public_id: 'conference-1-avatar'}, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  
  async uploadVideo(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({resource_type: 'video'}, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadVideoByPath(path: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.upload(path, 
  {resource_type: "video", public_id: "my_dog",
  overwrite: true, notification_url: "https://mysite.example.com/notify_endpoint"},
  function(error, result) {console.log(result, error)});
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid image file type.');
    });
  }

  async uploadVideoToCloudinary(file: Express.Multer.File) {
    return await this.uploadVideo(file).catch(() => {
      throw new BadRequestException('Invalid video file type.');
    });
  }

  async uploadVideoToCloudinaryByPath(path: string) {
    return await this.uploadVideoByPath(path).catch(() => {
      throw new BadRequestException('Invalid video file type.');
    });
  }

  getImage() {
    return v2.image("vn")
  }

  getVideo() {
    return v2.video("my_dog")
  }
}
