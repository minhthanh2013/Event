import { Conference } from './../conference/models/conference.interface';
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { resolve } from 'path';
import { Observable, from } from 'rxjs';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { ComboSessionDto, ComboSessionRequestDto } from './models/combo_session.dto';
import { ComboSessionEntity } from './models/combo_session.entity';
import { ComboSession } from './models/combo_session.interface';
import { ComboIdDateDto } from './models/combo_session_id_create_at';
import { NotFoundException } from '@nestjs/common';
import { ResponseError } from '@sendgrid/mail';
import { TicketEntity } from './../ticket/models/ticket.entity';
@Injectable()
export class CombosessionService {
  constructor(
    @InjectRepository(ComboSessionEntity)
    private readonly comboSessionRepository: Repository<ComboSessionEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  findAllSessions(): Observable<ComboSession[]> {
    return from(this.comboSessionRepository.find());
  }
  async createSession(comboRequestDto: ComboSessionRequestDto): Promise<ResponseData> {
    const result = new ResponseData();
    const listConferenceIds = comboRequestDto.listConferenceIds;
    const comboId = parseInt(await this.getLatestIndex()) + 1;;
    for (let index = 0; index < listConferenceIds.length; index++) {
        const conferenceId = listConferenceIds[index];
        const combo = new ComboSessionEntity();
        combo.id = parseInt(await this.getLatestId()) + 1;
        combo.combo_description = comboRequestDto.combo_description;
        combo.combo_id = comboId;
        combo.conference_id = conferenceId;
        combo.combo_name = comboRequestDto.combo_name;
        combo.discount = comboRequestDto.discount;
        const a = await this.comboSessionRepository.save(combo);
        if(!a) {
          throw new Error("Error");
        }
        if(index === listConferenceIds.length - 1) {
          return new Promise(async (resolve, reject) => {
            result.status = true;
            result.data = await this.findAllSessionsBySessionId(comboId).catch(err => {
              reject(err);
              throw err;
            });
            resolve(result.data);
            // return result;
          })
        }
    }
    

  }
  async update(comboSession: ComboSessionDto): Promise<ResponseData> {
    // console.log(66, comboSession)
    const result = new ResponseData();
    const combo = new ComboSessionEntity();
    combo.combo_description = comboSession.comboSessionDescription;
    combo.combo_name = comboSession.comboSessionName;
    combo.discount = comboSession.discount;
    const oldCombos = await this.comboSessionRepository.find({where: {combo_id: comboSession.comboSessionId}});
    for (let index = 0; index < oldCombos.length; index++) {
      const element = oldCombos[index];
      this.comboSessionRepository.update(element.id, combo);
    }
    result.status = true;
    result.data = null;
    return result;
  }
  remove(id: number): ResponseData {
    this.comboSessionRepository.find({where: {combo_id: id}})
    .then(results => {
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        this.comboSessionRepository.remove(result).catch((err1) => {
          throw err1;
        });
      }
    }).catch(err => {
      throw new NotFoundException("Cannot find combo sessions with id: " + id, err);
    });
    const finalRes = new ResponseData();
    finalRes.status = true;
    finalRes.data = "Successfully deleted";
    return finalRes;
    
  }
  async findAllComoIds(): Promise<ComboIdDateDto[]> {
    return this.comboSessionRepository.find({
        select: ['combo_id', "create_at"]
      }).then(results => {
        const tempJson: any[] = [];
        for (let index = 0; index < results.length; index++) {
          const combo = results[index];
          const comboTemp = new ComboIdDateDto();
          comboTemp.combo_id = combo.combo_id;
          comboTemp.create_at = combo.create_at;
          tempJson.push(JSON.parse(JSON.stringify(comboTemp)));
        }
        const arrayUniqueByKey = [...new Map(tempJson.map(item =>
          [item["combo_id"], item])).values()];
        return arrayUniqueByKey;
      }
    )
  }
  async getLatestIndex() {
    const query = this.comboSessionRepository
      .createQueryBuilder('combosession')
      .select('MAX(combosession.combo_id)', 'max');
    const result = await query.getRawOne();
    return result.max;
  }

  async getLatestId() {
    const query = this.comboSessionRepository
      .createQueryBuilder('combosession')
      .select('MAX(combosession.id)', 'max');
    const result = await query.getRawOne();
    return result.max;
  }

  comp(a: ComboIdDateDto, b: ComboIdDateDto) {
    return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
  }

  async getLatestXCombos(limit: number): Promise<ResponseData> {
    let arrayOfIdsAndDate = (await this.findAllComoIds())
    arrayOfIdsAndDate = arrayOfIdsAndDate.sort(this.comp);
    if(limit === 0) {
      limit = arrayOfIdsAndDate.length;
    }
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
    comboSessionDto.discount = comboEntities[0].discount;
    return new Promise(async (resolve, reject) => {
      const conferences: ConferenceEntity[] = [];
      for (let index = 0; index < comboEntities.length; index++) {
        const comboEntity = comboEntities[index];
        await this.conferenceRepository.findOne({
          where: {
            conference_id: comboEntity.conference_id
          }
        }).then(result => {
          comboSessionDto.comboSessionPrice += parseInt(result.price.toString());
          conferences.push(result);
          if(conferences.length == comboEntities.length) {
            comboSessionDto.conferenceList = conferences;
            const resultDto = new ResponseData()
            resultDto.status = true;
            resultDto.data = comboSessionDto;
            resolve(resultDto)
          }
        })
      }
    });
  }

  async findCombosByConferenceId(id: number): Promise<ResponseData> {
    let result = new ResponseData();
    result.data = [];
    return new Promise<ResponseData>(async (resolve, reject) => {
      await this.comboSessionRepository.find({
        where: {
          conference_id: id
        }
      }).then(async tempResults => {
        if(tempResults.length === 0) {
          reject("Fail to get list of conferences by id "+ id)
          throw new NotFoundException("Fail to get list of conferences by id "+ id);
        }
        for (let index = 0; index < tempResults.length; index++) {
          const tempResult = tempResults[index];
          await this.findAllSessionsBySessionId(tempResult.combo_id)
          .then(async temp => {
            await result.data.push(temp.data);
            if(index === tempResults.length - 1) {
              const update = new ResponseData();
              const tempMap = new Map();

              result.data.forEach(element => {
                tempMap.set(element.comboSessionId, element);
              });
              update.status = true;
              update.data = [...tempMap.values()];
              result = update;
              resolve(result);
            }
          })
        }
      }).catch((e) => {
       reject(e);
      })
    }).then((result) => {
      return result;
    }).catch((e) => {
      throw new NotFoundException(e);
    })
  }

  async getComboByHostId(id: number, isRevenue: string): Promise<ResponseData> {
    const response = new ResponseData();
    try {let response_1 = await new Promise<ResponseData>((resolve, reject) => {
        this.conferenceRepository.find({
          where: {
            host_id: id
          }
        }).then(async (results) => {
          if (results.length === 0) {
            throw new NotFoundException("Fail to get list of conferences by host id " + id);
          }
          const comboSessionDto: ComboSessionDto[] = [];
          for (let index = 0; index < results.length; index++) {
            const element = results[index];
            try {
              const tempCombos = await this.findCombosByConferenceId(element.conference_id);
              if (tempCombos.data.length === 0) {
                reject("Fail find combos by conference id: " + element.conference_id);
              }
              for (let j = 0; j < tempCombos.data.length; j++) {
                const tempCombo = tempCombos.data[j];
                if (isRevenue === "true") {
                  const price = await this.getComboRevenueById(tempCombo.comboSessionId);
                  tempCombo.totalPrice = price.data.totalPrice;
                  tempCombo.totalComboSell = price.data.totalComboSell;
                }
                comboSessionDto.push(tempCombo);
              }
            } catch (e) {
              console.log(e);
            }
          }
          if (comboSessionDto.length !== 0) {
            response.status = true;
            response.data = comboSessionDto;
            resolve(response);
          } else {
            throw new NotFoundException("Fail to get list of combos by host id " + id);
          }
        }).catch((error2) => {
          // Loi tu conferenceRepository.find
          reject(error2);
        });
      });
      if (response_1.data !== null) {
        const update = new ResponseData();
        const tempMap = new Map();
        response_1.data.forEach(element_1 => {
          tempMap.set(element_1.comboSessionId, element_1);
        });
        update.status = true;
        update.data = [...tempMap.values()];
        response_1 = update;
      } else {
        response_1.status = false;
      }
      return response_1;
    } catch (e_1) {
      throw e_1;
    }
  }
  
  async getComboByUserId(id: number): Promise<ResponseData> {
    let response = new ResponseData();
    const tickets = await this.ticketRepository.find({where: {
      buyer_id: id
    }})
    const comboSessionDtos: ComboSessionDto[] = [];
    await Promise.all(
      tickets.map(async (ticket) => {
        const conferenceId = ticket.conference_id;
        if(ticket.session_id.toString() !== '0') {
          try {
            const tempCombos = await this.findCombosByConferenceId(conferenceId);
              if (tempCombos.data === 0) {
                throw new NotFoundException("Fail find combos by conference id: " + conferenceId + ", user id: " + id);
              }
              tempCombos.data.forEach((tempCombo: ComboSessionDto) => {
                comboSessionDtos.push(tempCombo);
                response.data = comboSessionDtos;
              });
          } catch (error) {
            console.log(295, error);
          }
        }
      }
      )
    )

    if (response.data === undefined) {
      throw new NotFoundException("Fail to get list of combos by user id " + id);
    }
    if(response.data  !== null ) {
      const update = new ResponseData();
      const tempMap = new Map();
      response.data.forEach(element => {
        tempMap.set(element.comboSessionId, element);
      });
      update.status = true;
      update.data = [...tempMap.values()];
      response = update;
    } else {
      response.status = false;
    }

    return response;
}
  async getComboRevenueById(id: number): Promise<ResponseData> {
    const response = new ResponseData();
    try {
      let totalPrice = 0;
      let totalComboSell = 0;
      const combos = await this.comboSessionRepository.find({where: {combo_id: id }});
      for (let index = 0; index < combos.length; index++) {
        const combo = combos[index];
                // COMBO ID - CONF ID
        const tickets = await this.ticketRepository.find({where: {
          session_id: combo.combo_id,
          conference_id: combo.conference_id
        }})
        totalComboSell = tickets.length;
        const conference = await this.conferenceRepository.findOne({where: {conference_id: combo.conference_id}});
        totalPrice += parseInt(conference.price.toString()) * tickets.length;
      }
      response.status = true;
      response.data = {
        totalPrice: totalPrice,
        totalComboSell: totalComboSell
      }
      if(totalPrice === 0 && totalComboSell === 0) {
        response.status = false;
      }
    } catch (error) {
      response.data = null
      response.status = false;
    }
    return response;
  }
}