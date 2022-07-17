/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { UserEntity } from 'src/user/models/user.entity';
import { FindOptionsUtils, Repository } from 'typeorm';
import { ConferenceRequestDto, ConferenceResponseDto } from './models/conference.dto';
import { ConferenceEntity } from './models/conference.entity';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>,
    @InjectRepository(ConferenceTypeEntity)
    private readonly conferenceTypeRepository: Repository<ConferenceTypeEntity>,
    @InjectRepository(ConferenceCategoryEntity)
    private readonly conferenceCategoryRepository: Repository<ConferenceCategoryEntity>,
    @InjectRepository(UserEntity)
    private readonly speakerRepository: Repository<UserEntity>
  ) { }

  async findAllConferences(): Promise<ResponseData> {
    let result = new ResponseData()
    const data = await this.conferenceRepository.find()
    if (data.length >= 1) {
      result.data = data
    }
    else {
      result.status = false
    }
    return result;
  }
  async findOne(id: number): Promise<ResponseData> {
    let result = new ResponseData()
    const data = await this.conferenceRepository.findOne({ where: { conference_id: id } })
      result.status = data !== undefined
    return result;
  }
  async createConference(conference: ConferenceRequestDto): Promise<ResponseData> {
    let result = new ResponseData()
    this.convertDtoToEntity(conference)
    const data = await this.conferenceRepository.save(this.convertDtoToEntity(conference))
    result.status = data !== undefined
    return result;
  }

  async update(id: number, conference: ConferenceRequestDto): Promise<ResponseData> {
    let result = new ResponseData()
    const data = await this.conferenceRepository.update(id, this.convertDtoToEntity(conference))
      result.status = data.affected == 1
    return result;
  }
  async remove(id: number): Promise<ResponseData> {
    let result = new ResponseData()
    const data = await this.conferenceRepository.delete(id)
    result.status = data.affected == 1
    return result;
  }
  async getNumberOfConference(limit: number): Promise<ResponseData> {
    let result = new ResponseData()
    const data = await this.conferenceRepository.createQueryBuilder()
      .select("conferences")
      .from(ConferenceEntity, "conferences")
      .limit(limit)
      .getMany()
      if (data.length >= 1) {
        result.data = data
      }
      else {
        result.status = false
      }
    return result;
  }

  async getHostEvent(idHost: number): Promise<ResponseData> {
    let result = new ResponseData()
    const data2 = await this.conferenceRepository.find({
      relations : ["host"],
      where: { host : {
        host_id : idHost
      }}
    })
    if (data2.length >= 1) {
      result.data = data2
    } else {
      result.status = false
    }
    return result
  }
  convertEntityToDto(entity: ConferenceEntity): ConferenceResponseDto {
    let dto = new ConferenceResponseDto()
    dto.conferenceAddress = entity.address
    dto.conferenceDateStart = entity.date_start_conference
    dto.conferencePrice = entity.price
    dto.conferenceName = entity.conference_name
    return dto
  }
  
  convertDtoToEntity(dto: ConferenceRequestDto): ConferenceEntity {
    let entity = new ConferenceEntity()
    entity.conference_name = dto.conferenceName
    entity.host.user_name = dto.hostName
    entity.date_start_conference = dto.dateStartConference
    entity.date_start_sell = dto.dateStartSell
    entity.date_end_sell = dto.dateEndSell
    entity.date_end_conference = dto.dateStartConference
    entity.ticket_quantity = dto.ticketQuantity

    this.conferenceCategoryRepository.findOne({ 
      where: {category_name: dto.conferenceCategory}
    }).then( 
        value => entity.conference_category.category_id = value.category_id   
    )

    this.conferenceTypeRepository.findOne({
      where: {type_name: dto.conferenceType}
    }).then(
      value => entity.conference_type.type_id = value.type_id
    )
    
    // this.speakerRepository.findOne({
    //   where : { 
    //     email: dto.speakerEmail,
    //     user_name: dto.speakerName,
    //    }
    // }).then(
    //   value => entity.speaker.user_id = value.user_id
    // )
    return entity
  }
}

