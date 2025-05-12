import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Client } from 'src/modules/client/entities/client.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ClientSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async syncClient(): Promise<void> {
    const repo = this.dataSource.getRepository(Client);

    const already = await repo.count();
    if (already > 0) {
      console.log(`⚠️  Seeding de client omitido: ya existen  registros`);
      return;
    }

    const clients = Array.from({ length: 50 }).map(() =>
      repo.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.helpers.fake(
          '+591 {{string.numeric(3)}} {{string.numeric(3)}} {{string.numeric(2)}}',
        ),
        address: faker.location.streetAddress(),
      }),
    );

    await repo.save(clients);
    console.log('✅  clientes insertados');
  }
}
