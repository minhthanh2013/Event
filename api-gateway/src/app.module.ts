import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COREAPI',
        transport: Transport.TCP,
        options: {port: 3001}
      },
      {
        name: 'ZOOM',
        transport: Transport.TCP,
        options: {port: 3002}
      }, 
      {
        name: 'REDIS',
        transport: Transport.TCP,
        options: {port: 3003}
      }, 
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
