import { ComboSessionEntity } from 'src/combosession/models/combo_session.entity';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './models/payment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserEntity } from 'src/user/models/user.entity';
import { ConferenceEntity } from 'src/conference/models/conference.entity';
import { TicketEntity } from 'src/ticket/models/ticket.entity';
import { SubscriptionEntity } from 'src/subscription/models/subscription.entity';
import { HostEntity } from 'src/host/models/host.entity';
import { SubscriptionPlanEntity } from 'src/subscriptionplan/models/subscription_plan.entity';
import { RecordEntity } from 'src/record/models/record.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, UserEntity, ConferenceEntity, TicketEntity, SubscriptionEntity, HostEntity, SubscriptionPlanEntity, RecordEntity, ComboSessionEntity]),
  ClientsModule.register([
  {
    name: 'PAYMENT',
    transport: Transport.TCP,
    options: {
      host: 'payment',
      port: 3002,
    }
  }
])],
  providers: [PaymentService, EmailService],
  controllers: [PaymentController],
})
export class PaymentModule {}
