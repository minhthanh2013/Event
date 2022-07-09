/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ExpressAdapter } from "@nestjs/platform-express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Multer } from 'multer';

@Injectable()
export class ZoomService {
    constructor(
        @Inject('ZOOM') private readonly zoomClient: ClientProxy,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    downloadRecord() {
        const test =  this.zoomClient.send({ cmd: 'DOWNLOAD_RECORD' }, '')
        test.subscribe(res => {
            if(res === true) {
                return this.cloudinaryService.uploadVideoToCloudinaryByPath('../zoom/src/records/zoom.mp4');
            }
        })
        return test;
    }
}