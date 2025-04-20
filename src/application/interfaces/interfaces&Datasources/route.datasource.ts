import { RouteEntity } from '@/domain'
import { GetAllRoutesDto } from '@/application/dtos'

export abstract class RouteDataSource {
  abstract getAllRoutes(data: GetAllRoutesDto): Promise<RouteEntity[]>;
}