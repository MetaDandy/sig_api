import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/services/base/base.service';
import { FindAllDto } from 'src/dto/findAll.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    private readonly base: BaseService,
  ) {}

  create(createClientDto: CreateClientDto) {
    console.log(createClientDto);
    return 'This action adds a new client';
  }

  /**
   * obtine los client con paginación
   * @param query - Paginación para la búsqueda
   * @returns los clients encontrados
   */
  async findAll(query: FindAllDto<Client>) {
    return await this.base.findAll(this.clientRepo, query);
  }

  /**
   * Obtiene el client mediante el uuid.
   * @param id - Uuid del dealer.
   * @returns El cleint solicitado.
   */
  async findOne(id: string) {
    return await this.base.findOne(id, this.clientRepo);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    console.log(updateClientDto);
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
