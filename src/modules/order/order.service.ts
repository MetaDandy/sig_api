import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseService } from 'src/services/base/base.service';
import { FindAllDto } from 'src/dto/findAll.dto';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly base: BaseService
  ) { }

  /**
  * Crea un orders.
  * @param createOrderDto - Variables para crear el orders.
  * @returns El orders creado.
  */
  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepo.save(createOrderDto);
  }

  /**
 * Obtiene los orders con paginación.
 * @param query - Paginación para la búsqueda.
 * @returns Los orders encontrados.
 */
  async findAll(query: FindAllDto<Order>) {
    return await this.base.findAll(this.orderRepo, query);
  }

  /**
  * Obtiene el orders mediante el uuid.
  * @param id - Uuid del orders.
  * @returns El dealer solicitado.
  */
  async findOne(id: string) {
    return await this.base.findOne(id, this.orderRepo);
  }

  /**
   * Busca las ordenes, si no encuentra una envía un error.
   * @param orders - Uuids de las ordenes.
   */
  async checkOrders(orders: string[]) {
    const found = await this.orderRepo.findBy({ id: In(orders) });
    if (found.length !== orders.length) {
      throw new NotFoundException('Alguna orden no existe');
    }

    return found;
  }

  /**
   * Actualiza un order en específico.
   * @param id - Uuid del order.
   * @param updateOrderDto - Las variables necesarias para la actualilzación.
   * @returns El order actualizado.
   */
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id)
    this.orderRepo.merge(order, updateOrderDto)
    return await this.orderRepo.save(order);
  }

  /**
 * Elimina lógicamente un order.
 * @param id - Uuid del order.
 * @returns El order eliminado lógicamente.
 */
  async remove(id: string) {
    return await this.base.softDelete(id, this.orderRepo);
  }

  /**
  * Restaura un order y le quita la eliminación lógica.
  * @param id - Uuid del order.
  * @returns El order restaurado.
  */
  async restore(id: string) {
    return await this.base.restore(id, this.orderRepo);
  }
}
