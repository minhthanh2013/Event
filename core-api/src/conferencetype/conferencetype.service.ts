/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { Repository } from 'typeorm';
import { ConferenceTypeDto } from './models/conference_type.dto';
import { ConferenceTypeEntity } from './models/conference_type.entity';

@Injectable()
export class ConferencetypeService {
  constructor(
    @InjectRepository(ConferenceTypeEntity)
    private readonly conferenceTypeRepository: Repository<ConferenceTypeEntity>,
  ) {}
  async findAllConferenceTypes(): Promise<ResponseData> {
    let result = new ResponseData()
    const data = await this.conferenceTypeRepository.find()
    if (data.length >= 1) {
      result.data = data
    } else {
      result.status = false
    }
    return result;
  }
  convertEntityToDto(entity: ConferenceTypeEntity): ConferenceTypeDto {
    let resultDto = new ConferenceTypeDto()
    resultDto.typeId = entity.type_id
    resultDto.typeName = entity.type_name
    return resultDto
  }
}
