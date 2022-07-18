/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { BadRequestException } from '@nestjs/common';
import { Job } from 'bull';
import { ZoomDto } from './dto/zoom.dto';
import { ZoomService } from './zoom.service';
@Processor('zoom')
export class ZoomProcessor {
  constructor(private zoomService: ZoomService) {}

  @Process('download')
  async handleUploadRecord(job: Job) {
    const zoomDto: ZoomDto = new ZoomDto();
    zoomDto.downloadUrl = job.data.zoomDto.downloadUrl;
    zoomDto.zoomMeetingId = job.data.zoomDto.zoomMeetingId;
    return new Promise(async (resolve, reject) => {
      await this.zoomService.uploadRecord(zoomDto)
      .then(res => {
        // resolve(res);
      }).catch(err => {
        console.log(21, err);
        reject(err);
        throw new BadRequestException('Invalid video file type.', err);
      })
    });
  }
}