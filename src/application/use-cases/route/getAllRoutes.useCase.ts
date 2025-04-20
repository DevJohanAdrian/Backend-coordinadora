import type { RouteRepository } from '@/application/interfaces';
import type { RouteEntity } from '@/domain';
import type { GetAllRoutesDto } from '@/application/dtos';

export interface IGetAllRouteUse {
  execute(data: GetAllRoutesDto): Promise<Array<RouteEntity>>;
}

export class GetAllRouteUseCase implements IGetAllRouteUse {
  constructor(private readonly repository: RouteRepository) {}

  execute(data: GetAllRoutesDto): Promise<Array<RouteEntity>> {
    return this.repository.getAllRoutes(data);
  }
}
