import { Module } from '@nestjs/common';
import { DealerService } from './dealer.service';
import { DealerController } from './dealer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dealer } from './entities/dealer.entity';
import { BaseService } from 'src/services/base/base.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dealer])],
  controllers: [DealerController],
  providers: [DealerService, BaseService],
  exports: [DealerService]
})
export class DealerModule {}
