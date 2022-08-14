import { ComboSessionEntity } from 'src/combosession/models/combo_session.entity';
import { EmailService } from 'src/email/email.service';
import { SpeakerEntity } from 'src/speaker/models/speaker.entity';
import { ConferenceEntity } from './../conference/models/conference.entity';
/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AdminEntity } from './models/admin.entity';
import { Admin } from './models/admin.interface';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthDto } from './dto/admin.auth';
import { HttpService } from '@nestjs/axios';
import { Request, response } from 'express';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>,
    @InjectRepository(ComboSessionEntity)
    private readonly comboRepository: Repository<ComboSessionEntity>,
    @InjectRepository(SpeakerEntity)
    private readonly speakerRepository: Repository<SpeakerEntity>,
    private jwt: JwtService,
    private readonly httpService: HttpService,
    private readonly emailService: EmailService,
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
    if (await this.adminRepository.findOne({where: {user_name: dto.user_name}})) {
      throw new ConflictException('Username already exists');
    }
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
  async verifyConference(conferenceId: number, res: Request) {
    const jwt = res.headers.authorization;
    return new Promise(async (resolve, reject) => {
      await this.conferenceRepository.findOne({where: {conference_id: conferenceId}}).then(async conference => {
        if(conference) {
          conference.isValidated = true;
          conference.status_ticket = "published";
          await this.conferenceRepository.save(conference)
          .then(async (newConference) => {
            const headersRequest = {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': jwt,
              },
            }
            const a = this.httpService.post("http://localhost:3000/conference/schedule-zoom-meeting/" + newConference.conference_id, { headers: headersRequest });
            a.subscribe(async (data) => {
              console.log(data);
              resolve(data);
            }).add(() => {
              console.log("done");
            })
            resolve(true);
          })
          .catch(error => {
              reject(error)
              return error;
          })
        } else {
          reject(false);
        }
      }).then((response) => {
        // console.log(response);
      })
      .catch(error => {
        reject(error);
      }
      )
    });
  }

  async deleteConference(conferenceId: number) {
    return new Promise(async (resolve, reject) => {
      await this.conferenceRepository.findOne({where: {conference_id: conferenceId}}).then(async conference => {
        if(conference && conference.status_ticket === "draft") {
          const combo = await this.comboRepository.find({where: {conference_id: conferenceId}});
          await this.comboRepository.remove(combo).then(async () => {
          // await this.conferenceRepository.remove(conference).then(async () => {
            const resultDeleteSpeakers = await this.speakerRepository.find({where: {conference_id: conferenceId}});
            // await this.speakerRepository.remove(resultDeleteSpeakers);
            resultDeleteSpeakers.forEach(async (speaker) => {
              await this.speakerRepository.remove(speaker);
              this.emailService.sendEmailToSpeakersAfterDeleteConference(speaker.speaker_email, conference.conference_name)
            })
            this.conferenceRepository.remove(conference)
            resolve(true)
          })
;
          // })
        } else {
          reject(false);
        }
      }).catch(error => {
        reject(error);
      }
      )
    });
  }
}
