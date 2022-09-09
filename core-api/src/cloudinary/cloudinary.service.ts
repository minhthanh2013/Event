import { NotFoundException } from '@nestjs/common';
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

  async uploadVideoByPath(path: string, videoName: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.upload(path, 
      {resource_type: "video", public_id: videoName,
      overwrite: true, notification_url: "https://api.evenity.page:8443/zoom/notification/finish-upload-record"},
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

  async uploadVideoToCloudinaryByPath(path: string, videoName: string) {
    return await this.uploadVideoByPath(path, videoName).catch(() => {
      throw new BadRequestException('Invalid video file type.');
    });
  }

  getImage(meetingId: number) {
    const rawResponse = v2.image("conference-"+meetingId+"-avatar")
    const index = rawResponse.indexOf("'");
    const index2 = rawResponse.lastIndexOf("'");
    return rawResponse.slice(index + 1, index2);
  }
  getComboImage(meetingId: number) {
    const rawResponse = v2.image("session-"+meetingId+"-avatar")
    const index = rawResponse.indexOf("'");
    const index2 = rawResponse.lastIndexOf("'");
    return rawResponse.slice(index + 1, index2);
  }

  getVideo(meetingId: string) {
    let rawResponse = v2.video("conference-"+meetingId+"-record")
    while(true) {
      const index = rawResponse.indexOf("<");
      const index2 = rawResponse.indexOf(">");
      const temp = rawResponse.substring(index, index2+1);
      if(temp.includes("type='video/mp4'")) {
        return temp.slice(temp.indexOf("'")+1, temp.lastIndexOf("type") - 2)
      }
      rawResponse = rawResponse.substring(index2+1);
      if(rawResponse === "</video>") {
        throw new NotFoundException('Cannot find record with id '+ meetingId);
      }
    }
  }
}
