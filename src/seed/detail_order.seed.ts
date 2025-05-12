import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DetailOrder } from 'src/modules/detail_order/entities/detail_order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class DetailOrderSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async syncDetailOrder(): Promise<void> {
    const repo = this.dataSource.getRepository(DetailOrder);

    const already = await repo.count();
    if (already > 0) {
      console.log(`⚠️  Seeding de DetailOrder omitido: ya existen registros`);
      return;
    }

    const productRepo = this.dataSource.getRepository(Product);
    const orderRepo = this.dataSource.getRepository(Order);

    const products = await productRepo.find();
    const orders = await orderRepo.find();

    if (products.length === 0 || orders.length === 0) {
      console.log(
        '❌ No se puede crear detalles de orden sin productos ni órdenes existentes.',
      );
      return;
    }

    const details: DetailOrder[] = [];

    for (let i = 0; i < 5; i++) {
      const product = faker.helpers.arrayElement(products);
      const order = faker.helpers.arrayElement(orders);

      const amount = faker.number.int({ min: 1, max: 10 });
      const unit_price = Number(
        faker.commerce.price({ min: 5, max: 100, dec: 2 }),
      );
      const sub_total = parseFloat((unit_price * amount).toFixed(2));

      const detail = repo.create({
        product,
        order,
        amount,
        unit_price,
        delivery_address: faker.location.streetAddress(),
        sub_total,
      });

      details.push(detail);
    }

    await repo.save(details);
    console.log('✅  50 detalles de orden insertados');
  }
}
