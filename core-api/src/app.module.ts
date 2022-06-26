/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { BullModule } from '@nestjs/bull';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Bull config
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        }
      }),
      inject: [ConfigService]
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
        migrations: ['src/migrations/**/*{.ts,.js}'],
        synchronize: false,
        // Turn logging to true to see all the SQL queries
        logging: true,
        // migrations: [
        //   'dist/src/evenity/migrations/*.js'
        // ], 
      migrationsTableName: "custom_migration_table",
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
    CloudinaryModule,
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
