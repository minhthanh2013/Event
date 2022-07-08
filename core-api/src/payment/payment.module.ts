import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './models/payment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity]),
ClientsModule.register([
  {
    name: 'PAYMENT',
    transport: Transport.TCP,
    options: {
      port: 3002,
    }
  }
])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
