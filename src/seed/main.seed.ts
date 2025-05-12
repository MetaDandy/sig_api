import { Injectable } from '@nestjs/common';
import { ClientSeeder } from './client.seed';
// import { DetailOrderSeeder } from './detail_order.seed';

@Injectable()
export class MainSeeder {
  constructor(
    private readonly clientSeeder: ClientSeeder,
    // private readonly detailOrderSeeder: DetailOrderSeeder,
  ) {}

  async run() {
    console.log('🚀 Iniciando Seeders...');

    await this.clientSeeder.syncClient();
    // await this.detailOrderSeeder.syncDetailOrder();

    console.log('✅ Seeders completados.');
  }
}
