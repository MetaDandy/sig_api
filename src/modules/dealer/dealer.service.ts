import { Injectable } from '@nestjs/common';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dealer } from './entities/dealer.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/services/base/base.service';
import { FindAllDto } from 'src/dto/findAll.dto';

@Injectable()
export class DealerService {
  constructor(
    @InjectRepository(Dealer)
    private readonly dealerRepo: Repository<Dealer>,
    private readonly base: BaseService,
  ) {}

  /**
   * Crea un dealer.
   * @param createDealerDto - Variables para crear el dealer.
   * @returns El dealer creado.
   */
  async create(createDealerDto: CreateDealerDto) {
    return await this.dealerRepo.save(createDealerDto);
  }

  /**
   * Obtiene los dealers con paginación.
   * @param query - Paginación para la búsqueda.
   * @returns Los dealers encontrados.
   */
  async findAll(query: FindAllDto<Dealer>) {
    return await this.base.findAll(this.dealerRepo, query);
  }

  /**
   * Obtiene el dealer mediante el uuid.
   * @param id - Uuid del dealer.
   * @returns El dealer solicitado.
   */
  async findOne(id: string) {
    return await this.base.findOne(id, this.dealerRepo);
  }

  /**
   * Actualiza un dealer en específico.
   * @param id - Uuid del dealer.
   * @param updateDealerDto - Las variables necesarias para la actualilzación.
   * @returns El dealer actualizado.
   */
  async update(id: string, updateDealerDto: UpdateDealerDto) {
    const dealer = await this.findOne(id);

    this.dealerRepo.merge(dealer, updateDealerDto);

    return await this.dealerRepo.save(dealer);
  }

  /**
   * Elimina lógicamente un dealer.
   * @param id - Uuid del dealer.
   * @returns El dealer eliminado lógicamente.
   */
  async remove(id: string) {
    return await this.base.softDelete(id, this.dealerRepo);
  }

  /**
   * Restaura un dealer y le quita la eliminación lógica.
   * @param id - Uuid del dealer.
   * @returns El dealer restaurado.
   */
  async restore(id: string) {
    return await this.base.restore(id, this.dealerRepo);
  }
}
