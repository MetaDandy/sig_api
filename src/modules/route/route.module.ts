import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Delivery } from '../delivery/entities/delivery.entity';
import { DealerModule } from '../dealer/dealer.module';
import { OrderModule } from '../order/order.module';
import { BaseService } from 'src/services/base/base.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route, Delivery]),
    DealerModule,
    OrderModule,
  ],
  controllers: [RouteController],
  providers: [RouteService, BaseService],
})
export class RouteModule {}
