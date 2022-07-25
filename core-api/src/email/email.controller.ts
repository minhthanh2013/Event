/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
@Controller('email')
export class EmailController {   
  constructor(private emailService: EmailService) {}
  @Get()
  findAll() {
    return this.emailService.sendEmail();
  }
}
