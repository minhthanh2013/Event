/* eslint-disable prettier/prettier */
import { UserEntity } from './../user/models/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SpeakerEntity } from 'src/speaker/models/speaker.entity';
import { EmailService } from 'src/email/email.service';
import {
  SubmitConferenceRequestDto,
  ConferenceRequestDto,
  SpeakerRequestDto,
  SpeakerList,
} from './models/conference.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { ConferenceTypeEntity } from 'src/conferencetype/models/conference_type.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { TicketEntity } from 'src/ticket/models/ticket.entity';
import { ZoomService } from 'src/zoom/zoom.service';
import { DataSource, Repository } from 'typeorm';
import { ConferenceEntity } from './models/conference.entity';
import { ScheduleZoomDto } from './models/create.zoom.dto';
import { v4 as uuidv4 } from 'uuid';
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
    @InjectRepository(SpeakerEntity)
    private readonly speakerRepository: Repository<SpeakerEntity>,
    @InjectRepository(HostEntity)
    private readonly hostRepository: Repository<HostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly zoomService: ZoomService,
    private readonly emailService: EmailService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAllConferences(): Promise<ResponseData> {
    const result = new ResponseData();
    const data = await this.conferenceRepository.find();
    if (data !== undefined && data.length >= 1) {
      result.data = data;
    } else {
      result.status = false;
    }
    return result;
  }
  findAllByUserId(userId: number): Promise<ResponseData> {
    const result = new ResponseData();
    result.data = [];
    return new Promise(async (resolve, reject) => {
      this.ticketRepository
        .find({
          where: {
            buyer_id: userId,
          },
        })
        .then(async (tickets) => {
          for (let index = 0; index < tickets.length; index++) {
            const ticket = tickets[index];
            const conference = await this.conferenceRepository.findOne({
              where: {
                conference_id: ticket.conference_id,
              },
            });
            if (conference) {
              result.data.push(conference);
            }
          }
          const sortedAsc = result.data.sort(
            (objA, objB) =>
              objA.date_start_conference.getTime() -
              objB.date_start_conference.getTime(),
          );
          result.data = sortedAsc;
          result.status = result.data.length > 0;
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          return result;
        });
    });
  }

  async getHostDataByConferenceId(id: number): Promise<ResponseData> {
    return new Promise(async (resolve, reject) => {
      await this.findOne(id)
        .then((result) => {
          if (!result.status) {
            reject('Fail to get host by conference id: ' + id);
            const resultData = new ResponseData();
            resultData.data = [];
            resultData.status = false;
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
    const dto = await this.convertEntityToDto(data);
    result.status = data !== undefined;
    result.data = dto;
    return result;
  }
  async createConference(
    conference: ConferenceRequestDto,
  ): Promise<ResponseData> {
    const intPrice = parseInt(conference.conferencePrice.toString()) ;
    if (intPrice != 0 && intPrice < 30000) {
      throw new BadRequestException(
        'Event price must be greater than 30.000 VNĐ',
      );
    }
    if (conference.host_id !== undefined) {
      const host = await this.hostRepository.findOne({
        where: {
          host_id: conference.host_id,
        },
      });
      if (!host) {
        throw new NotFoundException('Host not found');
      }
      if (host.host_type === 'free') {
        const conferencesOwned = await this.conferenceRepository.count({
          where: {
            host_id: conference.host_id,
          },
        });
        if (conferencesOwned >= 20) {
          throw new BadRequestException(
            'You can not create more than 20 event',
          );
        }
      }
    }
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
      for (let index = 0; index < conference.speakerList.length; index++) {
        const speaker: SpeakerRequestDto = new SpeakerRequestDto();
        speaker.conference_id = data.conference_id;
        speaker.is_accepted = false;
        speaker.speaker_email = conference.speakerList[index].email;
        speaker.speaker_name = conference.speakerList[index].name;
        const myuuid = uuidv4();
        speaker.uuid = myuuid;
        await this.speakerRepository.save(speaker);
        this.emailService.sendEmailToSpeakerAfterConferenceIsSchedule(
          speaker.speaker_name,
          speaker.speaker_email,
          data.conference_name,
          data.date_start_conference,
          `https://evenity.page/zoom/join-by-uuid?uuid=${myuuid}`,
          data.address,
          data.conference_type == 1,
        );
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
    if (data.length !== undefined && data.length >= 1) {
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
    if (data2 !== undefined && data2.length >= 1) {
      result.data = data2;
    } else {
      result.status = false;
    }
    return result;
  }
  async convertEntityToDto(
    entity: ConferenceEntity,
  ): Promise<ConferenceRequestDto> {
    const dto = new ConferenceRequestDto();
    dto.conferenceName = entity.conference_name;
    dto.conferenceAddress = entity.address;
    dto.organizerName = entity.organizer_name;
    dto.conferenceType = entity.conference_type;
    dto.conferenceCategory = entity.conference_category;
    dto.conferenceDescription = entity.description;
    dto.status_ticket = entity.status_ticket;
    dto.host_id = entity.host_id;
    dto.conference_id = entity.conference_id;
    dto.address = entity.address;
    dto.date_start_conference = entity.date_start_conference;
    dto.isRecorded = entity.isRecorded;
    dto.isValidated = entity.isValidated;
    dto.viewed = entity.viewed;
    dto.popularity = entity.popularity;
    dto.speakerList = [];
    const speakers = await this.speakerRepository.find({
      where: { conference_id: entity.conference_id },
    });
    speakers.forEach((element) => {
      const speaker = new SpeakerList();
      speaker.name = element.speaker_name;
      speaker.email = element.speaker_email;
      dto.speakerList.push(speaker);
    });
    dto.dateStartConference = entity.date_start_conference;
    dto.dateStartSell = entity.date_start_sell;
    dto.dateEndSell = entity.date_end_sell;
    dto.ticketQuantity = entity.ticket_quantity;
    dto.conferencePrice = entity.price;
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
    entity.address = dto.conferenceAddress;
    entity.date_start_conference = dto.dateStartConference;
    entity.date_start_sell = dto.dateStartSell;
    entity.date_end_sell = dto.dateEndSell;
    entity.date_end_conference = dto.dateStartConference;
    entity.conference_type = dto.conferenceType;
    entity.conference_category = dto.conferenceCategory;
    entity.ticket_quantity = dto.ticketQuantity;
    entity.current_quantity = dto.ticketQuantity;
    entity.price = dto.conferencePrice;
    entity.description = dto.conferenceDescription;
    entity.organizer_name = dto.organizerName;
    entity.isRecorded = dto.isRecorded;
    this.conferenceCategoryRepository
      .findOne({
        where: { category_id: dto.conferenceCategory },
      })
      .then((value) => (entity.conference_category = value.category_id));

    this.conferenceTypeRepository
      .findOne({
        where: { type_id: dto.conferenceType },
      })
      .then((value) => (entity.conference_type = value.type_id));
    return entity;
  }
  async getLatestXConferences(limit: number, userId: string): Promise<ResponseData> {
    const conferences = await this.conferenceRepository
      .createQueryBuilder()
      .select('conference')
      .from(ConferenceEntity, 'conference')
      .where({ status_ticket: 'published' })
      // .where ({ order: {create_at: "DESC"}})
      .orderBy('conference.create_at', 'DESC')
      .getMany();
    const resultConferences: ConferenceEntity[] = [];
    if(userId !== '') {
      const user = await this.userRepository.findOne({where: {user_id: parseInt(userId)}});
      if(user) {
        const favorites = user.category;
        if(favorites !== null && favorites.length !== 0) {
          for (let index = 0; index < favorites.length; index++) {
            const favorite = favorites[index];
            if(favorite === "") { 
              break;
            }
            console.log(favorite)
            const category = await this.conferenceCategoryRepository.findOne({where: {category_name: favorite}});
            const categoryId = category.category_id;
            for (let j = 0; j < conferences.length; j++) {
              const element = conferences[j];
              if(element.conference_category.toString() === categoryId.toString()) {
                resultConferences.push(element);
              }
            }
          }
        }
      }
    }
    const temp  = resultConferences.length === 0 ? conferences : resultConferences;
    const result = new ResponseData();
    const conferenceResult: ConferenceEntity[] = [];
    for (let index = 0; index < limit; index++) {
      if (index > temp.length - 1) {
        break;
      }
      const conferenceTemp = temp[index];
      conferenceResult.push(conferenceTemp);
    }
    result.data = conferenceResult;
    result.status = conferenceResult.length >= 1;
    return result;
  }
  async findAllByHostId(id: number, status: string) {
    const result = new ResponseData();
    let tempResult: ConferenceEntity[] = [];
    if (status !== '') {
      tempResult = await this.conferenceRepository.find({
        where: {
          host_id: id,
          status_ticket: status,
        },
      });
    } else {
      tempResult = await this.conferenceRepository.find({
        where: {
          host_id: id,
        },
      });
    }
    result.status = tempResult !== undefined;
    if (tempResult !== undefined && tempResult.length >= 1) {
      result.data = tempResult;
    }
    return result;
  }

  async paginate(
    options: IPaginationOptions,
    search: string,
    onlyPublish: string,
    category: string,
  ): Promise<Pagination<ConferenceEntity>> {
    const queryBuilder =
      this.conferenceRepository.createQueryBuilder('conference');
    queryBuilder.orderBy('conference.create_at', 'DESC'); // Or whatever you need to do
    if (search !== '') {
      queryBuilder.where('conference.conference_name LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (onlyPublish === 'true') {
      queryBuilder.andWhere('conference.status_ticket = :status', {
        status: 'published',
      });
    if (category !== '') {
      queryBuilder.andWhere('conference.conference_category = :cate', {
        cate: category,
      }); 
    }
    }

    return paginate<ConferenceEntity>(queryBuilder, options);
  }
  async submitConference(
    conferenceSubmitDto: SubmitConferenceRequestDto,
  ): Promise<ResponseData> {
    const conference = await this.conferenceRepository.findOne({
      where: {
        conference_id: conferenceSubmitDto.conferenceId,
        host_id: conferenceSubmitDto.hostId,
        status_ticket: 'draft',
      },
    });
    if (!conference) {
      throw new NotFoundException(
        'Conference not found with conference id: ' +
          conferenceSubmitDto.conferenceId +
          ' and host id: ' +
          conferenceSubmitDto.hostId,
      );
    }
    conference.status_ticket = 'pending';
    const result = new ResponseData();
    const newConference = await this.conferenceRepository.save(conference);
    if (newConference) {
      result.status = true;
      result.data = newConference;
      const host = await this.hostRepository.findOne({
        where: { host_id: conferenceSubmitDto.hostId },
      });
      this.emailService.sendEmailToHostAfterSubmitConference(host.email);
      return result;
    }
  }

  async cancelConference(id: number): Promise<ResponseData> {
    const conference = await this.conferenceRepository.findOne({
      where: {
        conference_id: id,
        status_ticket: 'pending',
      },
    });
    if (!conference) {
      throw new NotFoundException(
        'Conference not found with conference id: ' + id,
      );
    }
    conference.status_ticket = 'draft';
    const result = new ResponseData();
    const newConference = await this.conferenceRepository.save(conference);
    if (newConference) {
      result.status = true;
      result.data = newConference;
      return result;
    }
  }

  async scheduleZoomMeeting(conferenceId: number) {
    const conference = await this.conferenceRepository.findOne({
      where: { conference_id: conferenceId },
    });
    if (conference.conference_type == 2) {
      // TODO only schedule when admin is submit.
      const zoomDto: ScheduleZoomDto = new ScheduleZoomDto();
      zoomDto.conferenceId = conference.conference_id;
      zoomDto.conferenceName = conference.conference_name;
      zoomDto.hostName = conference.organizer_name;
      const conferenceCategory =
        await this.conferenceCategoryRepository.findOne({
          where: {
            category_id: conference.conference_category,
          },
        });
      zoomDto.conferenceCategory = conferenceCategory.category_name;
      zoomDto.dateStartConference = conference.date_start_conference;
      const scheduleZoomResult = await this.zoomService.createConference(
        zoomDto,
      );
      return scheduleZoomResult;
    }
  }
  findMeetingByZoomMeetingId(meetingId: string) {
    const conference = this.conferenceRepository.findOne({
      where: {
        zoom_meeting_id: meetingId,
      },
    });
    if (conference) {
      return conference;
    } else {
      throw new NotFoundException(
        'Conference not found with meeting id: ' + meetingId,
      );
    }
  }
  async findConferenceByUserAndZoomMeetingId(
    userId: number,
    meetingId: string,
  ) {
    const conference = await this.conferenceRepository.findOne({
      where: {
        zoom_meeting_id: meetingId,
      },
    });
    if (!conference) {
      throw new NotFoundException(
        'Conference not found with meeting id: ' + meetingId,
      );
    }
    const confId = conference.conference_id;
    const ticket = await this.ticketRepository.findOne({
      where: {
        conference_id: confId,
        buyer_id: userId,
      },
    });
    return ticket;
  }
  async getAllHost(): Promise<ResponseData> {
    const result = new ResponseData();
    const host = await this.hostRepository.find({
      relations: ['subscriptions'],
    });

    if (host !== undefined && host.length >= 1) {
      result.data = host;
    } else {
      result.status = false;
    }
    return result;
  }
  async getAllUser(): Promise<ResponseData> {
    const result = new ResponseData();
    const user = await this.userRepository.find();
    result.status = user == undefined;
    if (user !== undefined && user.length >= 1) {
      result.data = user;
    }
    return result;
  }
  async deleteConference(id: number): Promise<ResponseData> {
    const conference = this.conferenceRepository.findOne({
      where: { conference_id: id },
    });
    if (!conference) {
      throw new NotFoundException(
        'Conference not found with conference id: ' + id,
      );
    }
    if ((await conference).status_ticket === 'draft') {
      const result = new ResponseData();
      await this.conferenceRepository.delete({ conference_id: id });
      result.status = true;
      return result;
    } else {
      throw new BadRequestException(
        'Can not delete conference with status: ' +
          (await conference).status_ticket,
      );
    }
  }
  async getConferenceRecord(id: number): Promise<ResponseData> {
    const conference = await this.conferenceRepository.findOne({
      where: { conference_id: id },
    });
    if (!conference) {
      throw new NotFoundException(
        'Conference not found with conference id: ' + id,
      );
    }
    if (
      conference.conference_type.toString() !== '2' ||
      conference.zoom_meeting_id === undefined
    ) {
      throw new NotFoundException(
        'Conference not found with conference id: ' + id,
      );
    }
    const result = new ResponseData();
    result.status = true;
    result.data = this.cloudinaryService.getVideo(conference.zoom_meeting_id);
    return result;
  }
  async endConference(id: number): Promise<ResponseData> {
    const result = new ResponseData();
    const conference = await this.conferenceRepository.findOne({
      where: { conference_id: id },
    });
    if (!conference) {
      throw new NotFoundException(
        'Conference not found with conference id: ' + id,
      );
    }
    if (conference.isValidated) {
      await this.conferenceRepository.update(id, { isValidated: false });
      result.status = true;
      return result;
    } else {
      throw new BadRequestException('Can not end conference with status');
    }
  }

  async updateViewConference(id: number): Promise<ResponseData> {
    const response = new ResponseData()
    try {
      const res = await this.conferenceRepository.increment({conference_id: id}, 'viewed', 1)
      if (res.affected == 1) {
        response.data = true
      } else {
        response.status = false
      }
    } catch (err) {
      response.status = false
      console.log(err)
    }
    return response
  }
}
