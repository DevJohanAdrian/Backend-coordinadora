import { RouteEntity } from '@/domain'
import { GetAllRoutesDto } from '@/application/dtos'

export abstract class RouteRepository {
  abstract getAllRoutes(data: GetAllRoutesDto): Promise<RouteEntity[]>;
}