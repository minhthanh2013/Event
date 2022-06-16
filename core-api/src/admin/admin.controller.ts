/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminService } from './admin.service';
import { Admin } from './models/admin.interface';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  findAll(): Observable<Admin[]> {
    return this.adminService.findAllAdmins();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: Admin,
  ): Observable<UpdateResult> {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.adminService.remove(+id);
  }

  @Post()
  create(@Body() admin: Admin): Observable<Admin> {
    return this.adminService.createAdmin(admin);
  }
}
