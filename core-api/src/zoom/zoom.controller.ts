/* eslint-disable prettier/prettier */
import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { Queue } from "bull";
import { ZoomDto } from "./dto/zoom.dto";
import { ZoomService } from "./zoom.service";
import fs from 'fs';

@Controller('zoom')
export class ZoomController {
    constructor(
        private readonly zoomService: ZoomService,
        @InjectQueue('zoom') private zoomQueue: Queue) {}

        @Post('/notification/finish-record')
        async notificationFinishRecord(@Body() data)   {
            const obj = JSON.parse(JSON.stringify(data));
            const zoomDto: ZoomDto = new ZoomDto();
            zoomDto.zoomMeetingId = obj.payload.object.id;
            if (obj.event === 'recording.completed') {
                await this.zoomService.getZoomDownloadUrl(zoomDto).then(res => {
                    const url = res.toString();
                    zoomDto.downloadUrl = url;
                    console.log('Added to queue')
                    this.zoomQueue.add('download', {
                        zoomDto: zoomDto
                    })
                }).catch(err => {
                    console.log(err);})
            }   
        }

        @Post('/notification/finish-upload-record')
        async notificationFinishUpload(@Body() data)   {
            const obj = JSON.parse(JSON.stringify(data));
            const publicId = obj.public_id;
            const splitted = publicId.split("-", 3); 
          // When finish uploading, we remove the meeting record file from the server
          const path = "/usr/src/app/resources/conference-" + splitted[1] + "-record.mp4";
          try {
            fs.unlinkSync(path)
            //file removed
          } catch(err) {
            console.error(err)
          }
    
        }
}