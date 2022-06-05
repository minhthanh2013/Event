import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AdminModule } from "./admin/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoryModule } from "./category/category.module";
import { ConferenceModule } from "./conference/conference.module";
import { HostModule } from "./host/host.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SpeakerModule } from "./speaker/speaker.module";
import { TicketModule } from "./ticket/ticket.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }), 
  UserModule,
  PrismaModule,
  ConferenceModule,
  CategoryModule,
  HostModule,
  AdminModule,
  SpeakerModule,
  TicketModule,
  // ClientsModule.register([
  //   {
  //     name: 'REDIS',
  //     transport: Transport.TCP,
  //   },
  //   {
  //     name: 'ZOOM',
  //     transport: Transport.TCP,
  //     options: {
  //       port: 3001,
  //     }
  //   }
  // ])
],
controllers: [AppController],
providers: [AppService],})
export class AppModule {}
