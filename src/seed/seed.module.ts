import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainSeeder } from './main.seed';
import { ConfigModule } from '@nestjs/config';
import dbConfig from '../config/db.config';
import { MetricsCodeSeeder } from './metrics_code.seed';
import { Client } from 'src/modules/client/entities/client.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig
    }),
    TypeOrmModule.forFeature([
      Client
    ]),
    
  ],
  providers: [

    MetricsCodeSeeder,
    MainSeeder,
  ],
  exports: [MainSeeder]
})
export class SeedModule { }
