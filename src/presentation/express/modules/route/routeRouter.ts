


import { verifyToken } from '@presentation/express/common/middleware/verifyToken';
import { Router } from 'express';
import { RouteController } from './routeController';
import { RouteQueryParamsSchema } from './routeModel';
import { RouteDatasourceImpl } from '@/infrastructure/datasources/route.datasource.impl';
import { RouteRepositoryImpl } from '@/infrastructure/repositories/route.repository.impl';
import validateQueryParams  from '@presentation/express/common/middleware/validateQueryParams';


//--------------------------------------------//
export class RouteRoutes {
  static get routes(): Router {
    const router = Router();

    const routeDatasource = new RouteDatasourceImpl(); // comunicacion a bd
    const routeRepository = new RouteRepositoryImpl(routeDatasource);
    const routeController = new RouteController(routeRepository);

    router.get('/', verifyToken, validateQueryParams(RouteQueryParamsSchema), routeController.getAllRoutes)

    return router;
  }
}
