import { RouteEntity } from '@/domain';
export class RouteMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(route: any): RouteEntity {
    return new RouteEntity(route.id, route.name, route.origin, route.destination, route.distance_km, route.estimated_time_minutes, route.active);
  }
}
