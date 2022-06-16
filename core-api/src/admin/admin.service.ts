/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  findOne(id: number): Observable<Admin> {
    return from(this.adminRepository.findOne({where: {admin_id: id}}));
  }

  update(id: number, admin: Admin): Observable<UpdateResult> {
    return from(this.adminRepository.update(id, admin));
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.adminRepository.delete(id));
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return from(this.adminRepository.save(admin));
  }
}
