import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { Repository } from 'typeorm';
import { AdminEntity } from './models/admin.entity';
import { Admin } from './models/admin.interface';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  findAllAdmins(): Observable<Admin[]> {
    return from(this.adminRepository.find());
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return from(this.adminRepository.save(admin));
  }
}
