import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/services/base/base.service';
import { FindAllDto } from 'src/dto/findAll.dto';
import { OrderService } from '../order/order.service';
import { Delivery } from '../delivery/entities/delivery.entity';
import { DealerService } from '../dealer/dealer.service';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly repo: Repository<Route>,
    @InjectRepository(Delivery)
    private readonly deliveryRepo: Repository<Delivery>,
    private readonly dealer: DealerService,
    private readonly order: OrderService,
    private readonly base: BaseService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { orders, dealer_id, ...routeData } = createRouteDto;

    const orderEntities = await this.order.checkOrders(orders);

    const dealer = await this.dealer.findOne(dealer_id);

    return this.repo.manager.transaction(async (manager) => {
      const route = manager.create(Route, {
        ...routeData,
        delivery_quantity: orders.length,
        dealer,
      });
      await manager.save(route);

      // * Suponiendo que las ordenes esten ordenadas por la llamada a la api.
      const deliveries = orderEntities.map((order, i) => {
        return manager.create(Delivery, {
          order,
          route,
          state: 'pending',
          comment: '',
          location_delivery: '',
          payment_type: '',
          order_delivery: i,
          delivery_date: null,
        });
      });

      await manager.save(deliveries);

      route.delivery = deliveries;
      return route;
    });
  }

  /**
   * Obtiene las rutas con paginación.
   * @param query - Paginación para la búsqueda.
   * @returns Las rutas encontradas.
   */
  async findAll(query: FindAllDto<Route>) {
    return await this.base.findAll(this.repo, query);
  }

  /**
   * Obtiene la ruta mediante el uuid.
   * @param id - Uuid de la ruta.
   * @returns La ruta solicitada.
   */
  async findOne(id: string) {
    return await this.base.findOne(id, this.repo);
  }

  /**
   * ! No se está tomando en cuenta el cambio de las órdenes ni del dealer, tomar en cuenta.
   * Actualiza una orden, pero solo los datos no críticos.
   * @param id - Uuid de la ruta.
   * @param updateRouteDto - Las variables necesarias para la actualilzación.
   * @returns La ruta actualizada.
   */
  async update(id: string, updateRouteDto: UpdateRouteDto) {
    const route = await this.findOne(id);

    const { orders: _, dealer_id: __, ...update } = updateRouteDto;

    this.repo.merge(route, update);

    return await this.repo.save(route);
  }

  /**
   * Elimina lógicamente una ruta.
   * @param id - Uuid de la ruta.
   * @returns La ruta eliminada lógicamente.
   */
  async remove(id: string) {
    return await this.base.softDelete(id, this.repo);
  }

  /**
   * Restaura una ruta y le quita la eliminación lógica.
   * @param id - Uuid de la ruta.
   * @returns La ruta restaurada.
   */
  async restore(id: string) {
    return await this.base.restore(id, this.repo);
  }
}
