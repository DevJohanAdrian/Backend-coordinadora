
import { pgPool } from '@/infrastructure/services/postgres.client'
import { GetAllRoutesDto } from '@/application/dtos'
import { RouteEntity } from '@/domain'
import { RouteMapper } from '@/infrastructure/mappers/route.mapper'
export class RouteDatasourceImpl {
 
  async getAllRoutes(data: GetAllRoutesDto): Promise<Array<RouteEntity>> {
    const { routeId } = data;
    const routes = await pgPool.query(
      `
        SELECT * FROM shipments
        WHERE
          ($1::int IS NULL OR id = $1)
      `,
      [
        routeId ?? null
      ]
    );
    return routes.rows.map(route => RouteMapper.toDomain(route));
  }
}
    

