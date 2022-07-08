/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, of } from 'rxjs';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
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

  findAllConferences(): Observable<ConferenceResponseDto[]> {
    var result: Array<ConferenceResponseDto> = []
    this.conferenceRepository.find().then(value => {
      value.forEach(element => result.push(this.convertEntityToDto(element)))
    })
    return of(result);
  }
  findOne(id: number): Observable<ConferenceResponseDto> {
    var result = new ConferenceResponseDto()
    this.conferenceRepository.findOne({ where: { conference_id: id } }).then(value => {
      result = this.convertEntityToDto(value)
    })
    return of(result);
  }
  createConference(conference: ConferenceRequestDto): Observable<ConferenceResponseDto> {
    var result = new ConferenceResponseDto()
    this.convertDtoToEntity(conference)
    this.conferenceRepository.save(this.convertDtoToEntity(conference)).then(value => {
      result = this.convertEntityToDto(value)
    })
    return of(result);
  }

  update(id: number, conference: ConferenceRequestDto): Observable<Boolean> {
    var result: Boolean = false
    this.conferenceRepository.update(id, this.convertDtoToEntity(conference)).then(value => {
      result = value.affected == 1
    })
    return of(result);
  }
  remove(id: number): Observable<Boolean> {
    var result: Boolean = false
    this.conferenceRepository.delete(id).then(value => {
      result = value.affected == 1
    })
    return of(result);
  }
  getNumberOfConference(limit: number): Observable<ConferenceResponseDto[]> {
    var result: Array<ConferenceResponseDto> = []
    this.conferenceRepository.createQueryBuilder()
      .select("conferences")
      .from(ConferenceEntity, "conferences")
      .limit(limit)
      .getMany().then(value => {
        value.forEach(element => {
          result.push(this.convertEntityToDto(element))
        })
      })
    return of(result)
  }
  convertEntityToDto(entity: ConferenceEntity): ConferenceResponseDto {
    var dto = new ConferenceResponseDto()
    dto.conferenceAddress = entity.address
    dto.conferenceDateStart = entity.date_start_conference
    dto.conferencePrice = entity.price
    dto.conferenceName = entity.conference_name
    return dto
  }
  
  convertDtoToEntity(dto: ConferenceRequestDto): ConferenceEntity {
    var entity = new ConferenceEntity()
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
    
    this.speakerRepository.findOne({
      where : { 
        email: dto.speakerEmail,
        user_name: dto.speakerName,
       }
    }).then(
      value => entity.speaker.user_id = value.user_id
    )
    return entity
  }
}

