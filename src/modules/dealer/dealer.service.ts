import { Injectable } from '@nestjs/common';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';

@Injectable()
export class DealerService {
  create(createDealerDto: CreateDealerDto) {
    return 'This action adds a new dealer';
  }

  findAll() {
    return `This action returns all dealer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dealer`;
  }

  update(id: number, updateDealerDto: UpdateDealerDto) {
    return `This action updates a #${id} dealer`;
  }

  remove(id: number) {
    return `This action removes a #${id} dealer`;
  }
}
