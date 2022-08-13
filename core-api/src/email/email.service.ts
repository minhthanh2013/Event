/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail')

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendConfirmTicket(email: string, ) {
    sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"))
    const msg = {
    to: email, // Change to your recipient
    from: 'minhthanhd013@gmail.com', // Change to your verified sender
    subject: 'Confirm bougth ticket',
    text: 'Hi there, your ticket has been bougth',
    html: 'You could check out you bought ticket under this link: <a href="http://localhost:3000/confirm">Confirm</a> Thank you for choosing our service. We hope you enjoy our service. Have a good day.',
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

  async sendConfirmRecord(email: string, ) {
    sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"))
    const msg = {
    to: email, // Change to your recipient
    from: 'minhthanhd013@gmail.com', // Change to your verified sender
    subject: 'Confirm bougth conference record',
    text: 'Hi there, your record has been bougth',
    html: 'You could check out you bought record under this link: <a href="http://localhost:3000/confirm">Confirm</a> Thank you for choosing our service. We hope you enjoy our service. Have a good day.',
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

  async sendBuySubscription(email: string, ) {
    sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"))
    const msg = {
    to: email, // Change to your recipient
    from: 'minhthanhd013@gmail.com', // Change to your verified sender
    subject: 'Confirm bougth subscription',
    text: 'Hi there, your subscription has been bougth',
    html: 'You could check out you bought record under this link: <a href="http://localhost:3000/confirm">Confirm</a> Thank you for choosing our service. We hope you enjoy our service. Have a good day.',
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

  async sendEmailToHostAfterSubmitConference(email: string, ) {
    sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"))
    const msg = {
    to: email, // Change to your recipient
    from: 'minhthanhd013@gmail.com', // Change to your verified sender
    subject: 'Confirm conference submission',
    text: 'Hi there, your conference has been submitted',
    html: 'Please wait untill your conference is approved by admin. Thank you for choosing our service. We hope you enjoy our service. Have a good day.',
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
