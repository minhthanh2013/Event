/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Multer } from 'multer';
import { ZoomDto } from "./dto/zoom.dto";
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from "rxjs";
import { ScheduleZoomDto } from "./dto/create.zoom.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ConferenceEntity } from "src/conference/models/conference.entity";
import { Repository } from "typeorm";
import { CreateSignature } from "./dto/create.signature";

@Injectable()
export class ZoomService {
    constructor(
        @Inject('ZOOM') private readonly zoomClient: ClientProxy,
        private readonly cloudinaryService: CloudinaryService,
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
        @InjectRepository(ConferenceEntity)
        private readonly conferenceRepository: Repository<ConferenceEntity>,
        
        ) 
        {}

        async uploadRecord(zoomDto: ZoomDto): Promise<any> {
            return new Promise(async (resolve, reject) => {
                this.zoomClient.send({ cmd: 'DOWNLOAD_RECORD' }, zoomDto).subscribe(async (res) => {
                    if (res === true) {
                        await this.cloudinaryService.uploadVideoToCloudinaryByPath("/usr/src/app/resources/conference-" + zoomDto.zoomMeetingId + "-record.mp4", "conference-" + zoomDto.zoomMeetingId + "-record")
                        .then(res => {
                            resolve(res);
                        }).catch(err => {
                            reject(err);
                        })
                    }}
                    )});
        }
    
        getZoomDownloadUrl(zoomDto: ZoomDto) {
            const headersRequest = {
                'Content-Type': 'application/json', // afaik this one is not needed
                'Authorization': `Bearer ${this.config.get('ZOOM_JWT_KEY')}`,
            };
            const url = "https://" + this.config.get("ZOOM_BASE_URL") + "/v2/meetings/" + zoomDto.zoomMeetingId +"/recordings";
            const a = this.httpService.get( url, { headers: headersRequest });
            a.subscribe(res => {
                const obj = JSON.parse(JSON.stringify(res.data));
                return obj.recording_files[0].download_url;
            })
            return new Promise((resolve) => {
                this.httpService.get( url, { headers: headersRequest }).subscribe(res => {
                    const obj = JSON.parse(JSON.stringify(res.data));
                    resolve(obj.recording_files[0].download_url);
                    // return obj.recording_files[0].download_url;
                })
            })
        }

        async createConference(scheduleZoomDto: ScheduleZoomDto): Promise<any> {
            const conference: ConferenceEntity = await this.conferenceRepository.findOne({ where: { conference_id: scheduleZoomDto.conferenceId } });
            return new Promise(async (resolve) => {
                this.zoomClient.send({ cmd: 'CREATE_CONFERENCE' }, scheduleZoomDto).subscribe(async (res) => {
                    conference.zoom_meeting_id = res.id;
                    resolve(this.conferenceRepository.save(conference));
                }
            )}
            )
        };

        async createSignature(createSignature: CreateSignature): Promise<any> {
            return new Promise(async (resolve, reject) => {
                this.zoomClient.send({ cmd: 'GET_SIGNATURE' }, createSignature).subscribe(async (res) => {
                    resolve(res);
                }
                )}
            )
        }
}