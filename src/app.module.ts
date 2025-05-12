import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DealerModule } from './modules/dealer/dealer.module';
import { ClientModule } from './modules/client/client.module';
import { OrderModule } from './modules/order/order.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { RouteModule } from './modules/route/route.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DetailOrderModule } from './modules/detail_order/detail_order.module';
import dbConfig from './config/db.config';

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
    DealerModule,
    ClientModule,
    OrderModule,
    DeliveryModule,
    ProductModule,
    RouteModule,
    VehicleModule,
    DetailOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
