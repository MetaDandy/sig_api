import { Injectable } from '@nestjs/common';
import { ClientSeeder } from './client.seed'

@Injectable()
export class MainSeeder {
  constructor(
    private readonly clientSeeder: ClientSeeder
  ) {}

  async run() {
    console.log('🚀 Iniciando Seeders...');
    
    await this.clientSeeder.syncClient()

    console.log('✅ Seeders completados.');
  }
}
