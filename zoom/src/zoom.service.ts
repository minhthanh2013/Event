import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWriteStream } from 'fs';
import { finished } from 'stream';
import { CreateSignature } from './dto/create.signature';
import { ScheduleZoomDto } from './dto/create.zoom.dto';
import { HttpService } from '@nestjs/axios';

const KJUR = require('jsrsasign')
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const https = require('https');

// import KJUR from 'jsrsasign';
// import Fs from 'fs';
// import Path from 'path';
// import Axios from 'axios';
// import https from 'https';


@Injectable()
export class ZoomService {
  constructor(
    private readonly config: ConfigService,  
    private readonly httpService: HttpService,
    ) {}

  generateSignature(createSignature: CreateSignature) {
    // Prevent time sync issue between client signature generation and Zoom
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2
  
    const oHeader = { alg: 'HS256', typ: 'JWT' }
  
    const oPayload = {
      sdkKey: this.config.get('ZOOM_SDK_KEY'),
      mn: createSignature.meetingNumber,
      role: createSignature.role,
      iat: iat,
      exp: exp,
      appKey: this.config.get('ZOOM_SDK_KEY'),
      tokenExp: iat + 60 * 60 * 2
    }
  
    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, this.config.get('ZOOM_SDK_SECRET'));
    return JSON.stringify({signature: signature});
  }

  async downloadFile(fileUrl: string, outputLocationPath: string) {
    const writer = createWriteStream(outputLocationPath);
  
    return Axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    }).then(response => {
  
      //ensure that the user can call `then()` only when the file has
      //been downloaded entirely.
  
      return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
          //no need to call the reject here, as it will have been called in the
          //'error' stream;
        });
      });
    });
  }

  scheduleMeeting(scheduleZoomDto: ScheduleZoomDto) {
    const encodeToken = this.config.get('ZOOM_JWT_KEY');
    const headersRequest = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${encodeToken}`
  };
  const url = "https://" + this.config.get("ZOOM_BASE_URL") + `/v2/users/${this.config.get('ZOOM_USER_ID')}/meetings`;
    const data = JSON.stringify({
      "agenda": scheduleZoomDto.conferenceName,
      "default_password": false,
      "duration": 60,
      "password": "357159",
      "pre_schedule": false,
      "schedule_for": "minhthanhd013@gmail.com",
      "settings": {
          "allow_multiple_devices": true,
          "approval_type": 2,
          "auto_recording": "cloud",
          "calendar_type": 2,
          "close_registration": true,
          "contact_email": "minhthanhd013@gmail.com",
          "contact_name": scheduleZoomDto.hostName,
          "email_notification": true,
          "encryption_type": "enhanced_encryption",
          "focus_mode": true,
          "host_video": false,
          "jbh_time": 0,
          "join_before_host": false,
          "meeting_authentication": false,
          "mute_upon_entry": true,
          "participant_video": false,
          "private_meeting": false,
          "registrants_confirmation_email": true,
          "registrants_email_notification": true,
          "registration_type": 1,
          "show_share_button": false,
          "use_pmi": false,
          "waiting_room": false,
          "watermark": false
        },
        "start_time": scheduleZoomDto.dateStartConference,
        "template_id": "Dv4YdINdTk+Z5RToadh5ug==",
        "timezone": "Asia/Saigon",
        "topic": scheduleZoomDto.conferenceCategory,
        "type": 2
});
const a = this.httpService.post( url,  data, { headers: headersRequest });
return new Promise((resolve, reject) => {
  a.subscribe(
    (res) => {
      const obj = JSON.parse(JSON.stringify(res.data));
      resolve(obj);
    }
  )
}
)
}
getMeetingDetails(meetingId: string) {
  const encodeToken = this.config.get('ZOOM_JWT_KEY');
  const headersRequest = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${encodeToken}`
};
const url = "https://" + this.config.get("ZOOM_BASE_URL") + `/v2/meetings/${meetingId}`;
const a = this.httpService.get( url, { headers: headersRequest });
return new Promise((resolve, reject) => {
  a.subscribe(
    (res) => {
      const obj = JSON.parse(JSON.stringify(res.data));
      resolve(obj);
    }
  )
}
)
}
}
