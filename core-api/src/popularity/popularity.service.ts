import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { ConferenceCategoryEntity } from 'src/conferencecategory/models/conference_category.entity';
import { ResponseData } from 'src/responsedata/response-data.dto';
import { UserEntity } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { PopularityDto } from './Model/popularity.dto';
import { PopularityEntity } from './Model/popularity.entity';

@Injectable()
export class PopularityService {
  constructor(
    @InjectRepository(PopularityEntity)
    private readonly popularRepostory: Repository<PopularityEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ConferenceEntity)
    private readonly conferenceRepository: Repository<ConferenceEntity>,
    @InjectRepository(ConferenceCategoryEntity)
    private readonly confCateRepository: Repository<ConferenceCategoryEntity>,
  ) {}
  async checkUnique(popularity: PopularityDto): Promise<ResponseData> {
    const userInfo = await this.userRepository.findOne({
      where: { user_id: popularity.userId },
    });
    const conf = await this.conferenceRepository.findOne({
      where: { conference_id: popularity.conferenceId },
    });
    const conf_cate_id = conf.conference_category;
    const cate = (
      await this.confCateRepository.findOne({
        where: { category_id: conf_cate_id },
      })
    ).category_name;
    const popular = conf.popularity;
    let totalUserSameCategory: number = 0;
    (await this.userRepository.find()).forEach((index) => {
      if (index.category?.includes(cate)) {
        totalUserSameCategory += 1;
      }
    });
    console.log(0);
    const response = new ResponseData();
    if (popularity.userId == 0) {
      console.log(1);
      response.data = ((popular / totalUserSameCategory) * 100).toFixed(2);
      response.status = true;
      return response;
    }
    const data = await this.popularRepostory.findOne({
      where: {
        viewer_id: popularity.userId,
        conference_id: popularity.conferenceId,
      },
    });
    if (data !== null) {
      console.log(2);
      response.data = ((popular / totalUserSameCategory) * 100).toFixed(2);
      response.status = true;
      return response;
    }
    console.log(3);
    let check = false;
    userInfo.category.forEach((index) => {
      if (cate == index) {
        check = true;
      }
    });
    console.log(userInfo.category, cate, check);
    if (check) {
      await this.popularRepostory.insert({
        viewer_id: popularity.userId,
        conference_id: popularity.conferenceId,
      });
      await this.conferenceRepository.increment(
        { conference_id: popularity.conferenceId },
        'popularity',
        1,
      );
      response.data = ((popular / totalUserSameCategory) * 100).toFixed(2);
      response.status = true;
    }
    return response;
  }
}
