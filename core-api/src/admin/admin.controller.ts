import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { AdminService } from './admin.service';
import { Admin } from './models/admin.interface';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  findAll(): Observable<Admin[]> {
    return this.adminService.findAllAdmins();
  }

  @Post()
  create(@Body() admin: Admin): Observable<Admin> {
    return this.adminService.createAdmin(admin);
  }
}
