import { Module, CacheModule, OnModuleInit, Inject, CACHE_MANAGER } from '@nestjs/common';
import { RedisCacheService } from './redis.service';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigModule, ConfigService } from "@nestjs/config";
import {Cache} from 'cache-manager';

@Module({
  imports:[
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          ttl: 60*3600*1000,
        }
      }
    })
  ],
  exports:[
    RedisCacheModule,RedisCacheService
  ],
  providers: [RedisCacheService]
})
export class RedisCacheModule implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache:Cache
  ) {}

  public onModuleInit():any {
      
  }
}
