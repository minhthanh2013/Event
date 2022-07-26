/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail')

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmail() {
    
    sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"))
    const msg = {
    to: 'damon.taquan@moondoo.org', // Change to your recipient
    from: 'minhthanhd013@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
  }
}
