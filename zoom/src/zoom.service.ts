import { Injectable } from '@nestjs/common';
const crypto = require('crypto')
import { ConfigService } from '@nestjs/config';
import { createWriteStream } from 'fs';
import { finished } from 'stream';
import { CreateSignature } from './dto/create.signature';
const KJUR = require('jsrsasign')
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')


@Injectable()
export class ZoomService {
  constructor(
    private readonly config: ConfigService,  
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
          }
          //no need to call the reject here, as it will have been called in the
          //'error' stream;
        });
      });
    });
  }
}
