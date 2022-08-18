/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { Repository } from 'typeorm';
import { ConferenceCategoryDto } from './models/conference_category.dto';
import { ConferenceCategoryEntity } from './models/conference_category.entity';

@Injectable()
export class ConferencecategoryService {
  constructor(
    @InjectRepository(ConferenceCategoryEntity)
    private readonly conferenceCategoryRepository: Repository<ConferenceCategoryEntity>,
  ) {}

  async findAllConferenceCategories(): Promise<ResponseData> {
    const result = new ResponseData()
    const data = await this.conferenceCategoryRepository.find()
    if (data.length >= 1) {
      result.data = data
    } else {
      result.status = false
    }
    console.log(result)
    return result;
  }
  convertEntityToDto(entity: ConferenceCategoryEntity): ConferenceCategoryDto {
    const resultDto = new ConferenceCategoryDto()
    resultDto.categoryId = entity.category_id
    resultDto.categoryName = entity.category_name
    return resultDto
  }
}
