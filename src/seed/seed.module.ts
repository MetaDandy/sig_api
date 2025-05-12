import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainSeeder } from './main.seed';
import { ConfigModule } from '@nestjs/config';
import dbConfig from '../config/db.config';
import { Client } from 'src/modules/client/entities/client.entity';
import { ClientSeeder } from './client.seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  providers: [ClientSeeder, MainSeeder],
  exports: [MainSeeder],
})
export class SeedModule {}
