/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { ResponseDataPagination } from 'src/responsedata/response-data-pagination.dto';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { UserEntity } from 'src/user/models/user.entity';
import { ZoomService } from 'src/zoom/zoom.service';
import { DataSource, Repository } from 'typeorm';
import {
  ConferenceRequestDto,
  ConferenceResponseDto,
} from './models/conference.dto';
import { ConferenceEntity } from './models/conference.entity';
import { ScheduleZoomDto } from './models/create.zoom.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

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
    private readonly speakerRepository: Repository<UserEntity>,
    @InjectRepository(HostEntity)
    private readonly hostRepository: Repository<HostEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly zoomService: ZoomService,
  ) {}

  async findAllConferences(): Promise<ResponseData> {
    const result = new ResponseData();
    const data = await this.conferenceRepository.find();
    if (data.length >= 1) {
      result.data = data;
    } else {
      result.status = false;
    }
    return result;
  }
  async getHostDataByConferenceId(id: number): Promise<ResponseData> {
    return new Promise(async (resolve, reject) => {
      await this.findOne(id)
        .then((result) => {
          if (!result.status) {
            reject('Fail to get host by conference id: ' + id);
            return null;
          }
          this.hostRepository
            .findOne({
              where: {
                host_id: result.data.host_id,
              },
            })
            .then((host) => {
              const resultData = new ResponseData();
              resultData.data = host;
              resultData.status = true;
              resolve(resultData);
            })
            .catch((e) => {
              throw e;
            });
        })
        .catch((e) => {
          throw e;
        });
    });
  }
  async findOne(id: number): Promise<ResponseData> {
    const result = new ResponseData();
    const data = await this.conferenceRepository.findOne({
      where: { conference_id: id },
    });

    result.status = data !== undefined;
    if (result.status === true) {
      result.data = data;
    }
    return result;
  }
  async createConference(
    conference: ConferenceRequestDto,
  ): Promise<ResponseData> {
    return this.getLatestIndex().then(async (latestIndex) => {
      const indexNumber: number = +latestIndex;
      const result = new ResponseData();
      const newConference: ConferenceEntity = await this.convertDtoToEntity(
        conference,
      );
      newConference.conference_id = indexNumber + 1;
      const data = await this.conferenceRepository.save(newConference);
      result.status = data !== undefined;
      result.data = data;
      if (data.conference_type == 2) {
        const zoomDto: ScheduleZoomDto = new ScheduleZoomDto();
        zoomDto.conferenceId = data.conference_id;
        zoomDto.conferenceName = data.conference_name;
        zoomDto.hostName = conference.hostName;
        const conferenceCategor =
          await this.conferenceCategoryRepository.findOne({
            where: {
              category_id: data.conference_category,
            },
          });
        zoomDto.conferenceCategory = conferenceCategor.category_name;
        zoomDto.dateStartConference = data.date_start_conference;
        const scheduleZoomResult = await this.zoomService.createConference(
          zoomDto,
        );
        console.log(scheduleZoomResult);
      }
      return result;
    });
  }

  async update(
    id: number,
    conference: ConferenceRequestDto,
  ): Promise<ResponseData> {
    const result = new ResponseData();
    const data = await this.conferenceRepository.update(
      id,
      await this.convertDtoToEntity(conference),
    );
    result.status = data.affected == 1;
    return result;
  }
  async remove(id: number): Promise<ResponseData> {
    const result = new ResponseData();
    const data = await this.conferenceRepository.delete(id);
    result.status = data.affected == 1;
    return result;
  }
  async getNumberOfConference(limit: number): Promise<ResponseData> {
    const result = new ResponseData();
    const data = await this.conferenceRepository
      .createQueryBuilder()
      .select('conferences')
      .from(ConferenceEntity, 'conferences')
      .limit(limit)
      .getMany();
    if (data.length >= 1) {
      result.data = data;
    } else {
      result.status = false;
    }
    return result;
  }

  async getHostEvent(idHost: number): Promise<ResponseData> {
    const result = new ResponseData();
    const data2 = await this.conferenceRepository.find({
      relations: ['host'],
      where: {
        host: {
          host_id: idHost,
        },
      },
    });
    if (data2.length >= 1) {
      result.data = data2;
    } else {
      result.status = false;
    }
    return result;
  }
  convertEntityToDto(entity: ConferenceEntity): ConferenceResponseDto {
    const dto = new ConferenceResponseDto();
    dto.conferenceAddress = entity.address;
    dto.conferenceDateStart = entity.date_start_conference;
    dto.conferencePrice = entity.price;
    dto.conferenceName = entity.conference_name;
    return dto;
  }

  async getLatestIndex() {
    const query = this.conferenceRepository
      .createQueryBuilder('conference')
      .select('MAX(conference.conference_id)', 'max');
    const result = await query.getRawOne();
    return result.max;
  }

  async convertDtoToEntity(
    dto: ConferenceRequestDto,
  ): Promise<ConferenceEntity> {
    const entity = new ConferenceEntity();
    entity.conference_name = dto.conferenceName;
    entity.host = await this.hostRepository.findOne({
      where: { user_name: dto.hostName },
    });
    entity.date_start_conference = dto.dateStartConference;
    entity.date_start_sell = dto.dateStartSell;
    entity.date_end_sell = dto.dateEndSell;
    entity.date_end_conference = dto.dateStartConference;
    entity.ticket_quantity = dto.ticketQuantity;
    this.conferenceCategoryRepository
      .findOne({
        where: { category_id: dto.conferenceCategoryId },
      })
      .then((value) => (entity.conference_category = value.category_id));

    this.conferenceTypeRepository
      .findOne({
        where: { type_id: dto.conferenceTypeId },
      })
      .then((value) => (entity.conference_type = value.type_id));
    return entity;
  }
  async getLatestXConferences(limit: number): Promise<ResponseData> {
    const conferences = await this.conferenceRepository
      .createQueryBuilder()
      .select('conference')
      .from(ConferenceEntity, 'conference')
      // .where ({ order: {create_at: "DESC"}})
      .orderBy('conference.create_at', 'DESC')
      .getMany();
    const result = new ResponseData();
    const conferenceResult: ConferenceEntity[] = [];
    for (let index = 0; index < limit; index++) {
      if (index > conferences.length - 1) {
        break;
      }
      const conferenceTemp = conferences[index];
      conferenceResult.push(conferenceTemp);
    }
    result.data = conferenceResult;
    result.status = conferences.length >= 1;
    return result;
  }
  async findAllByHostId(id: number) {
    const result = new ResponseData();
    const tempResult = await this.conferenceRepository.find({
      where: {
        host_id: id,
      },
    });
    result.status = tempResult.length > 1;
    if (tempResult.length > 1) {
      result.data = tempResult;
    }
    return result;
  }

  async paginate(options: IPaginationOptions, search: string): Promise<Pagination<ConferenceEntity>> {
    console.log(258, search)
    const queryBuilder = this.conferenceRepository.createQueryBuilder('conference');
    queryBuilder.orderBy('conference.create_at', 'DESC') // Or whatever you need to do
    if (search !== '') {
      console.log("here")
      queryBuilder.where('conference.conference_name LIKE :search', {
        search: `%${search}%`,
    });
  }
    return paginate<ConferenceEntity>(queryBuilder, options);
  }

  // getAllWithFilter(
  //   page: number,
  //   limit: number,
  //   search: string,
  // ): Promise<ResponseDataPagination> {
  //   const result = new ResponseDataPagination();
  //   if(limit === undefined || limit === null){
  //     limit = 12;
  //   }
  //   const query = this.conferenceRepository
  //     .createQueryBuilder()
  //     .select('conference')
  //     .from(ConferenceEntity, 'conference')
  //     .skip(page * limit)
  //     .take(limit);
  //   if (search) {
  //     query.where('conference.conference_name LIKE :search', {
  //       search: `%${search}%`,
  //     });
  //   }
  //   return new Promise((resolve, reject) => {
  //     query
  //       .getManyAndCount()
  //       .then(async (res) => {
  //         result.data = res[0];
  //         result.status = true;
  //         await this.dataSource.query('SELECT COUNT("conference_id") FROM "public"."Conference"').then(async (data) => {
  //           result.total = data[0].count;
  //         }).catch(err => {
  //           console.log(err);
  //         })
  //         resolve(result);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       })
  //       .finally(() => {
  //         return result;
  //       });
  //   });
  // }
}
