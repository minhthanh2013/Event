import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZoomMtg } from '@zoomus/websdk';
const crypto = require('crypto')
const Buffer = require('buffer/').Buffer   
const https = require('https');
@Injectable()
export class ZoomService {
    constructor(
      private readonly config: ConfigService,
      private readonly httpService: HttpService,     
      ) {}
    
    // https://www.npmjs.com/package/jsrsasign
   generateSignature(apiKey, apiSecret, meetingNumber, role) {
      // Prevent time sync issue between client signature generation and Zoom
      const timestamp = new Date().getTime() - 30000
      const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
      const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
      const signature = Buffer.from(apiKey, meetingNumber, timestamp, role, hash).toString('base64')
      return signature
    }
    
    createMeeting () {
    const encodeToken = this.config.get('ZOOM_JWT_KEY');
    const data = JSON.stringify({
      "agenda": "Test Conference",
      "default_password": false,
      "duration": 60,
      "password": "357159",
      "pre_schedule": false,
      "schedule_for": "minhthanhd013@gmail.com",
      "settings": {
          "allow_multiple_devices": true,
          "approval_type": 2,
          "authentication_exception": [
            {
              "email": "minhthanhd015@gmail.com",
              "name": "Khong can invite"
            }
          ],
          "auto_recording": "cloud",
          "calendar_type": 2,
          "close_registration": true,
          "contact_email": "minhthanhd013@gmail.com",
          "contact_name": "Thanh Do",
          "email_notification": true,
          "encryption_type": "enhanced_encryption",
          "focus_mode": true,
          "host_video": false,
          "jbh_time": 0,
          "join_before_host": false,
          "meeting_authentication": true,
          "meeting_invitees": [
            {
              "email": "minhthanhd015@gmail.com"
            },
            {
              "email": "18126032@student.hcmus.edu.vn"
            }
          ],
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
        "start_time": "2022-04-02T12:15:00",
        "template_id": "Dv4YdINdTk+Z5RToadh5ug==",
        "timezone": "Asia/Saigon",
        "topic": "Conference",
        "type": 2
      });

      var options = {
        hostname: this.config.get('ZOOM_BASE_URL'),
        port: 443,
        path: '/v2/users/AX1v6fhLR1Op7tiPbXqg0Q/meetings',
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${encodeToken}`
           }
      };
      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          res.on('data', (d) => {
            process.stdout.write(d);
          });
          res.on('error', reject);
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode <= 299) {
  
              resolve({statusCode: res.statusCode, headers: res.headers, body: JSON.parse(data)});
            } else {
              reject('Request failed. status: ' + res.statusCode + ', body: ' + data);
            }
          });
        });
        req.on('error', reject);
        req.write(data, 'binary');
        req.end();
        });
       }    
}
