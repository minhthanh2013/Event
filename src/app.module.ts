import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ZoomModule } from './zoom/zoom.module';
import { RedisCacheModule } from './redis/redis.module';
import { ConferenceModule } from './conference/conference.module';
import { CategoryModule } from './category/category.module';
import { HostModule } from './host/host.module';
import { AdminModule } from './admin/admin.module';
import { UserAuthModule } from './user-auth/user.auth.module';
import { HostAuthModule } from './host-auth/host.auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), 
    UserModule,
    PrismaModule,
    ZoomModule,
    RedisCacheModule,
    ConferenceModule,
    CategoryModule,
    HostModule,
    AdminModule,],
})
export class AppModule {}
