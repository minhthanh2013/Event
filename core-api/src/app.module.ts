import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { CategoryModule } from "./category/category.module";
import { ConferenceModule } from "./conference/conference.module";
import { HostModule } from "./host/host.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SpeakerModule } from "./speaker/speaker.module";
import { TicketModule } from "./ticket/ticket.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), 
  UserModule,
  PrismaModule,
  ConferenceModule,
  CategoryModule,
  HostModule,
  AdminModule,
  SpeakerModule,
  TicketModule
],})
export class AppModule {}
