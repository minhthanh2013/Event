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
    from: '18126014@student.hcmus.edu.vn', // Change to your verified senderhttp://localhost:3000/confirm
    subject: 'Confirm bougth ticket',
    text: 'Hi there, your ticket has been bougth',
    html: `You could check out your bought ticket under this link: <a href="${this.configService.get("PROTOCOL_INTERNET")}://${this.configService.get("HOST_INTERNET")}:${this.configService.get("PORT_INTERNET")}">Confirm</a> Thank you for choosing our service. We hope you enjoy our service. Have a good day.`,
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
    from: '18126014@student.hcmus.edu.vn', // Change to your verified sender
    subject: 'Confirm bougth conference record',
    text: 'Hi there, your record has been bougth',
    html: `You could check out you bought record under this link: <a href="${this.configService.get("PROTOCOL_INTERNET")}://${this.configService.get("HOST_INTERNET")}:${this.configService.get("PORT_INTERNET")}/confirm">Confirm</a> Thank you for choosing our service. We hope you enjoy our service. Have a good day.`,
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
    from: '18126014@student.hcmus.edu.vn', // Change to your verified sender
    subject: 'Confirm bougth subscription',
    text: 'Hi there, your subscription has been bougth',
    html: `You could check out you bought record under this link: <a href="${this.configService.get("PROTOCOL_INTERNET")}://${this.configService.get("HOST_INTERNET")}:${this.configService.get("PORT_INTERNET")}/confirm">Confirm</a> Thank you for choosing our service. We hope you enjoy our service. Have a good day.`,
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
    from: '18126014@student.hcmus.edu.vn', // Change to your verified sender
    subject: 'Confirm conference submission',
    text: 'Hi there, your conference has been submitted',
    html: `Please wait untill your conference is approved by admin. Thank you for choosing our service. We hope you enjoy our service. Have a good day.`,
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


  async sendEmailToSpeakersAfterDeleteConference(email: string, confName: string) {
    sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"))
    const msg = {
    to: email, // Change to your recipient
    from: '18126014@student.hcmus.edu.vn', // Change to your verified sender
    subject: 'Delete conference notification',
    text: `Delete conference notification`,
    html: `<p>Hi, due to some reasons, ${confName} conference has been deleted.</p>
    <p>Therefore your link to the conference wont be available. Sorry because of this inconvenience.</p>`,
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

  async sendEmailToSpeakerAfterConferenceIsSchedule(speakerName: string, email: string, confName: string, dateStart: Date, zoomLink: string, address: string, isOfflineConf: boolean) {
    sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"))
    const msg = {
    to: email, // Change to your recipient
    from: '18126014@student.hcmus.edu.vn', // Change to your verified sender
    subject: 'Confirm speaker invitation',
    text: `Hi ${speakerName}, you have been invited as a speaker to ${confName} conference.`,
    html: `
    <p>Hi ${email}. You have been invited as a speaker to ${confName}</p>
    ${isOfflineConf ? `<p>You can access your conference on ${dateStart}</p>` : 
    `<p>You can join the conference by clicking the link below</p>
    <a href="${zoomLink}">Join the conference</a>`}
    <p>Note: You cannot join the online meeting when it isn't start</p>
    <p>Thank you for choosing our service. We hope you enjoy our service. Have a good day.</p>
    .`,
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
