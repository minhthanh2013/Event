/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminService } from './admin.service';
import { AdminAuthDto } from './dto/admin.auth';
import { AdminJwtGuard } from './guard/admin.jwt.guard';
import { Admin } from './models/admin.interface';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  findAll(): Observable<Admin[]> {
    return this.adminService.findAllAdmins();
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  findOne(@Param('id') id: string): Observable<Admin>  {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminJwtGuard)
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: Admin,
  ): Observable<UpdateResult> {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(AdminJwtGuard)
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.adminService.remove(+id);
  }

  @Post("signup")
  createAdmin(@Body() admin: Admin) {
    return this.adminService.signupAdmin(admin);
  }
  
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signinAdmin(@Body() dto: AdminAuthDto) {
    return this.adminService.signinAdmin(dto);
  }
}
