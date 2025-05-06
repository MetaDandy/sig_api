import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailOrderDto } from './create-detail_order.dto';

export class UpdateDetailOrderDto extends PartialType(CreateDetailOrderDto) {}
