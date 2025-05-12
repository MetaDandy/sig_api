import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FindAllDto } from '../../dto/findAll.dto';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class BaseService {
  /**
   * 📄 Pagina los resultados de una entidad.
   * @param repository - Repositorio de TypeORM de la entidad.
   * @param query - Parámetros de paginación (límite, página, ordenamiento).
   * @param relations - Relaciones opcionales a incluir.
   * @param options - Opciones adicionales de búsqueda y relaciones.
   * @returns Un objeto con los datos paginados y metadatos.
   */
  async findAll<T>(
    repository: Repository<T>,
    query: FindAllDto<T>,
    relations: string[] = [],
    options?: FindManyOptions<T>,
  ) {
    const { limit, page, orderBy, orderDirection } = query;

    const orderField = orderBy || 'createdAt';

    const [data, totalCount] = await repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: relations.length > 0 ? relations : undefined,
      order: {
        [orderField]: orderDirection || 'ASC',
        id: 'ASC', // ← criterio secundario para garantizar orden estable
      } as any,
      ...options,
    });

    return {
      page,
      limit,
      totalCount,
      hasMore: page * limit < totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data,
    };
  }

  /**
   * 🗑️ Pagina los registros eliminados lógicamente de una entidad.
   * @param repository - Repositorio de TypeORM de la entidad.
   * @param query - Parámetros de paginación (límite, página, ordenamiento).
   * @param relations - Relaciones opcionales a incluir.
   * @returns Un objeto con los datos paginados de registros eliminados lógicamente.
   */
  async findAllSoftDeleted<T>(
    repository: Repository<T>,
    query: FindAllDto<T>,
    relations: string[] = [],
  ) {
    return this.findAll(repository, query, relations, {
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) } as any,
    });
  }

  /**
   * 🔍 Obtiene un registro por su ID.
   * @param id - UUID del registro.
   * @param relations - Relaciones opcionales a incluir.
   * @returns El registro encontrado o una excepción si no existe.
   */
  async findOne<T>(
    id: string,
    repository: Repository<T>,
    relations: string[] = [],
  ) {
    const entity = await repository.findOne({
      where: { id } as any,
      relations: relations.length > 0 ? relations : undefined,
    });

    if (!entity)
      throw new NotFoundException(`No se encontró el registro solicitado.`);

    return entity;
  }

  /**
   * 🗑️ Elimina físicamente un registro.
   * @param id - UUID del registro.
   * @param repository - Repositorio de TypeORM de la entidad.
   * @returns El registro eliminado.
   */
  async hardDelete<T>(id: string, repository: Repository<T>) {
    const entity = await repository.findOne({
      where: { id } as any,
      withDeleted: true,
    });

    if (!entity) throw new BadRequestException('El registro no existe');

    return repository.delete(id);
  }

  /**
   * 🚫 Elimina lógicamente un registro.
   * @param id - UUID del registro.
   * @param repository - Repositorio de TypeORM de la entidad.
   * @returns El registro eliminado lógicamente.
   */
  async softDelete<T>(id: string, repository: Repository<T>) {
    const entity = await repository.findOne({
      where: { id } as any,
      withDeleted: true,
    });

    if (!entity) throw new BadRequestException('El registro no existe');
    if ((entity as any).deletedAt) {
      throw new UnauthorizedException('El registro ya fue eliminado');
    }

    return repository.softRemove(entity);
  }

  /**
   * 📌 Verifica si un registro tiene relaciones antes de eliminar físicamente.
   * @param id - UUID del registro.
   * @param repository - Repositorio de TypeORM de la entidad.
   * @param relationCheck - Función que verifica relaciones y retorna un booleano.
   * @returns El registro eliminado si no tiene relaciones.
   */
  async hardDeleteWithRelationsCheck<T>(
    id: string,
    repository: Repository<T>,
    relationCheck: (id: string) => Promise<boolean>,
  ) {
    try {
      const hasRelations = await relationCheck(id);
      console.log('✅ hasRelations:', hasRelations);

      if (hasRelations) {
        throw new UnauthorizedException(
          'No se puede eliminar el registro porque tiene dependencias',
        );
      }

      return this.hardDelete(id, repository);
    } catch (err) {
      console.error('❌ Error en softDeleteWithRelationsCheck:', err);
      throw err;
    }
  }

  /**
   * 🛑 Verifica si un registro tiene relaciones antes de eliminar lógicamente.
   * @param id - UUID del registro.
   * @param repository - Repositorio de TypeORM de la entidad.
   * @param relationCheck - Función que verifica relaciones y retorna un booleano.
   * @returns El registro eliminado lógicamente si no tiene relaciones.
   */
  async softDeleteWithRelationsCheck<T>(
    id: string,
    repository: Repository<T>,
    relationCheck: (id: string) => Promise<boolean>,
  ) {
    try {
      const hasRelations = await relationCheck(id);
      console.log('✅ hasRelations:', hasRelations);

      if (hasRelations) {
        throw new UnauthorizedException(
          'No se puede eliminar el registro porque tiene dependencias',
        );
      }

      return this.softDelete(id, repository);
    } catch (err) {
      console.error('❌ Error en softDeleteWithRelationsCheck:', err);
      throw err;
    }
  }

  /**
   * 🔄 Restaura un registro eliminado lógicamente.
   * @param id - UUID del registro.
   * @param repository - Repositorio de TypeORM de la entidad.
   * @returns Mensaje de éxito con el registro restaurado.
   */
  async restore<T>(id: string, repository: Repository<T>) {
    const entity = await repository.findOne({
      where: { id } as any,
      withDeleted: true,
    });

    if (!entity) throw new BadRequestException('El registro no existe');
    if (!(entity as any).deletedAt) {
      throw new UnauthorizedException('El registro no está eliminado');
    }

    await repository.restore(id);

    return { message: 'Registro restaurado correctamente', entity };
  }
}
