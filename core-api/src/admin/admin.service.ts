/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AdminEntity } from './models/admin.entity';
import { Admin } from './models/admin.interface';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthDto } from './dto/admin.auth';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private jwt: JwtService,
  ) {}

  findAllAdmins(): Observable<Admin[]> {
    return from(this.adminRepository.find());
  }

  findOne(id: string): Observable<Admin> {
    return from(this.adminRepository.findOne({where: {admin_id: id}}));
  }

  update(id: number, admin: Admin): Observable<UpdateResult> {
    return from(this.adminRepository.update(id, admin));
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.adminRepository.delete(id));
  }

  async signinAdmin(dto: AdminAuthDto) {
    // find the user by email
    const admin = await this.adminRepository.findOne({
        where: {
            user_name: dto.username,
        },
    });
    // if user does not exist throw exception
    if(!admin) 
        throw new ForbiddenException(
            'Creadentials incorrect',
        );
    // compare password
    const pwMatches = await argon.verify(
        admin.password,
        dto.password,
    );
    // if password incorrect throw exception
    if(!pwMatches) 
        throw new ForbiddenException(
            'Creadentials incorrect',
        );

    return this.signToken(admin.admin_id, admin.user_name, 'admin');
}

  async signupAdmin(dto: Admin) {
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try{
      dto.password = hash;
      const newAdmin = new AdminEntity();
      newAdmin.user_name = dto.user_name;
      newAdmin.password = dto.password;
      newAdmin.admin_id = dto.admin_id;
      newAdmin.email = dto.email;
      console.log(newAdmin)
      const admin = await this.adminRepository.save(newAdmin);
      return this.signToken(admin.admin_id, admin.email, 'admin');
    } catch(error) {
        throw error;
    }
  }
  async signToken(userId: string, username: string, role: string): Promise<{access_token: string}> {
    const payload = {
        sub: userId,
        username,
        role,
    }

    
    const token = await this.jwt.signAsync(
        payload,
    );

    return {
        access_token: token,
    } 
}
}