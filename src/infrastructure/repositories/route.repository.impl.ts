import type { RouteRepository } from '@/application/interfaces';
import type { RouteEntity } from '@/domain';
import type { RouteDataSource } from '@/application/interfaces';
import type { GetAllRoutesDto } from '@/application/dtos';

export class RouteRepositoryImpl implements RouteRepository {
  constructor(private readonly routeDatastore: RouteDataSource) {}

  getAllRoutes(data: GetAllRoutesDto): Promise<RouteEntity[]> {
    return this.routeDatastore.getAllRoutes(data);
  }
  
}
