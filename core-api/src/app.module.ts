import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { type } from 'os';
// import { AdminModule } from "./admin/admin.module";
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CategoryModule } from "./category/category.module";
// import { ConferenceModule } from "./conference/conference.module";
// import { HostModule } from "./host/host.module";
// import { PrismaModule } from "./prisma/prisma.module";
// import { SpeakerModule } from "./speaker/speaker.module";
// import { TicketModule } from "./ticket/ticket.module";
// import { UserModule } from "./user/user.module";
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ConferenceModule } from './conference/conference.module';
import { HostModule } from './host/host.module';
import { ConferencetypeModule } from './conferencetype/conferencetype.module';
import { ConferencecategoryModule } from './conferencecategory/conferencecategory.module';
import { AnalyticModule } from './analytic/analytic.module';
import { CombosessionModule } from './combosession/combosession.module';
import { PaymentModule } from './payment/payment.module';
import { RecordModule } from './record/record.module';
import { SpeakerModule } from './speaker/speaker.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionplanModule } from './subscriptionplan/subscriptionplan.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASS'),
        database: configService.get('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AdminModule,
    UserModule,
    ConferenceModule,
    HostModule,
    ConferencetypeModule,
    ConferencecategoryModule,
    AnalyticModule,
    CombosessionModule,
    PaymentModule,
    RecordModule,
    SpeakerModule,
    SubscriptionModule,
    SubscriptionplanModule,
    TicketModule,
    // UserModule,
    // PrismaModule,
    // ConferenceModule,
    // CategoryModule,
    // HostModule,
    // AdminModule,
    // SpeakerModule,
    // TicketModule,
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
  providers: [AppService],
})
export class AppModule {}
