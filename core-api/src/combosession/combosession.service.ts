/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ComboSessionDto } from './models/combo_session.dto';
import { ComboSessionEntity } from './models/combo_session.entiy';
import { ComboSession } from './models/combo_session.interface';

@Injectable()
export class CombosessionService {
  constructor(
    @InjectRepository(ComboSessionEntity)
    private readonly comboSessionRepository: Repository<ComboSessionEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>,
  ) {}

  findAllSessions(): Observable<ComboSession[]> {
    return from(this.comboSessionRepository.find());
  }
  findOne(id: number): Observable<ComboSession> {
    return from(this.comboSessionRepository.findOne({where: {combo_id: id}}));
  }
  createSession(comboSession: ComboSession): Observable<ComboSession> {
    return from(this.comboSessionRepository.save(comboSession));
  }
  update(id: number, comboSession: ComboSession): Observable<UpdateResult> {
    return from(this.comboSessionRepository.update(id, comboSession));
  }
  remove(id: number): Observable<DeleteResult> {
    return from(this.comboSessionRepository.delete(id));
  }
  async findAllSessionsBySessionId(comboId: number): Promise<ComboSessionDto> {
    const comboSessionDto = new ComboSessionDto();
    const comboEntities = await this.comboSessionRepository.find({
      where: {
        combo_id: comboId
      }
    })
    comboSessionDto.comboSessionId = comboEntities[0].combo_id;
    comboSessionDto.comboSessionDescription = comboEntities[0].combo_description;
    comboSessionDto.comboSessionName = comboEntities[0].combo_name;
    comboSessionDto.comboSessionPrice = 0;
    return new Promise((resolve, reject) => {
      const conferences: ConferenceEntity[] = [];
      comboEntities.forEach(async comboEntity => {
        // console.log(44, comboEntity)
        await this.conferenceRepository.findOne({
          where: {
            conference_id: comboEntity.conference_id
          }
        }).then(result => {
          comboSessionDto.comboSessionPrice += result.price;
          conferences.push(result);
          if(conferences.length == comboEntities.length) {
            comboSessionDto.conferenceList = conferences;
            resolve(comboSessionDto)
          }
        })
      })
    });
  }
}
