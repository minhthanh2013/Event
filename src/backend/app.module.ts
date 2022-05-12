import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RenderModule } from 'nest-next';
import Next from 'next';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { ConferenceModule } from './conference/conference.module';
import { HostModule } from './host/host.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisCacheModule } from './redis/redis.module';
import { SpeakerModule } from './speaker/speaker.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { ZoomModule } from './zoom/zoom.module';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), 
  RenderModule.forRootAsync(Next({dev : true}),
  { viewsDir: null }),
    UserModule,
    PrismaModule,
    ZoomModule,
    RedisCacheModule,
    ConferenceModule,
    CategoryModule,
    HostModule,
    AdminModule,
    SpeakerModule,
    TicketModule,],
    controllers: [AppController],
})
export class AppModule {}
