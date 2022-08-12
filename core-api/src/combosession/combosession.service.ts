/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { resolve } from 'path';
import { Observable, from } from 'rxjs';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ComboSessionDto } from './models/combo_session.dto';
import { ComboSessionEntity } from './models/combo_session.entiy';
import { ComboSession } from './models/combo_session.interface';
import { ComboIdDateDto } from './models/combo_session_id_create_at';

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
  async findAllComoIds(): Promise<ComboIdDateDto[]> {
    return this.comboSessionRepository.find({
        select: ['combo_id', "create_at"]
      }).then(result => {
        const tempJson: any[] = [];
        result.forEach(combo => {
          const comboTemp = new ComboIdDateDto();
          comboTemp.combo_id = combo.combo_id;
          comboTemp.create_at = combo.create_at;
          tempJson.push(JSON.parse(JSON.stringify(comboTemp)));
        })
        const arrayUniqueByKey = [...new Map(tempJson.map(item =>
          [item["combo_id"], item])).values()];
        return arrayUniqueByKey;
      }
    )
  }
    
  comp(a: ComboIdDateDto, b: ComboIdDateDto) {
    return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
  }

  async getLatestXCombos(limit: number): Promise<ResponseData> {
    let arrayOfIdsAndDate = (await this.findAllComoIds())
    arrayOfIdsAndDate = arrayOfIdsAndDate.sort(this.comp);
    const arrayOfIdsAndDateResult = [];
    for(let i = 0; i < limit; i++){
      arrayOfIdsAndDateResult.push(arrayOfIdsAndDate[i]);
    }
    if (limit > arrayOfIdsAndDate.length) {
      limit = arrayOfIdsAndDate.length;
    }
    return new Promise((resolve, reject) => {
      const comboSessionDto: ComboSessionDto[] = [];
      for (let index = 0; index < limit; index++) {
        const comboId = arrayOfIdsAndDateResult[index].combo_id;
        this.findAllSessionsBySessionId(comboId).then(result => {
          comboSessionDto.push(result.data);
          if(comboSessionDto.length === limit) {
            const resultDto = new ResponseData()
            resultDto.status = true;
            resultDto.data = comboSessionDto;
            resolve(resultDto);
          }
        })
      }
    });
  }

  async findAllSessionsBySessionId(comboId: number): Promise<ResponseData> {
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
            const resultDto = new ResponseData()
            resultDto.status = true;
            resultDto.data = comboSessionDto;
            resolve(resultDto)
          }
        })
      })
    });
  }

  findComboByConferenceId(id: number): Promise<ResponseData> {
    const result = new ResponseData();
    return new Promise(async (resolve, reject) => {
      await this.comboSessionRepository.findOne({
        where: {
          conference_id: id
        }
      }).then(tempResult => {
        console.log(131, tempResult === null)
        if(tempResult === undefined || tempResult === null) {
          reject("fail")
          return 0;
        }
        this.findAllSessionsBySessionId(tempResult.combo_id).then(temp => {
          result.data = temp;
          result.status = true;
          resolve(result)
        })
      })
    })
  }

  getComboByHostId(id: number): Promise<ResponseData> {
    const response = new ResponseData();
    return new Promise((resolve, reject) => {
      this.conferenceRepository.find({
        where: {
          host_id: id
        }
      }).then(async results => {
        const comboSessionDto: ComboSessionDto[] = [];
        for (let index = 0; index < results.length; index++) {
          const element = results[index];
          await this.findComboByConferenceId(element.conference_id).then(tempCombo => {
            comboSessionDto.push(tempCombo.data)
            console.log(159, comboSessionDto)
          }).catch((error) => {
            console.log(error)
          })
          if(index === results.length - 1) {
            console.log("here")
            response.status = true;
            response.data = comboSessionDto;
            // resolve(response);
          }
        }
      }).catch((error2) => {
        reject("Fail to get list of combo by host id" + error2 );
      }).finally(()=>{
        resolve(response);
      })
    })
  }
  async paginate(options: IPaginationOptions, search: string): Promise<Pagination<ComboSessionEntity>> {
    const queryBuilder = this.comboSessionRepository.createQueryBuilder('combosession');
    if (search !== '') {
      queryBuilder.where('combosession.combo_name LIKE :search', {
        search: `%${search}%`,
    });
    }
    return paginate<ComboSessionEntity>(queryBuilder, options);
  }
}
