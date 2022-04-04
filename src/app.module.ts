import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ZoomModule } from './zoom/zoom.module';
import { RedisCacheModule } from './redis/redis.module';
import { ApiModule } from './api/api.module';
import { ConferenceModule } from './conference/conference.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), 
    AuthModule,
    UserModule,
    PrismaModule,
    ZoomModule,
    RedisCacheModule,
    ApiModule,
    ConferenceModule,
    CategoryModule,],
})
export class AppModule {}
