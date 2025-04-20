

import { ShipmentRepositoryImpl } from '@/infrastructure/repositories/shipment.repository.impl'
import { ShipmentDatasourceImpl } from '@/infrastructure/datasources/shipment.datasource.impl'
import { validateRequest } from '@presentation/express/common/utils';
import { verifyToken } from '@presentation/express/common/middleware/verifyToken';
import validateQueryParams  from '@presentation/express/common/middleware/validateQueryParams';
import { Router } from 'express';
import { z } from 'zod';
import { ShipmentController } from './shipmentController';
import { ShipmentSchema, AssignShipmentSchema, ShipmentQueryParamsSchema } from './shipmentModel';
import { GoogleMapsAddressValidator } from '@/infrastructure/services/GoogleMapsAddressValidator';
import env from '@/presentation/express/config/envs';
import { RouteRepositoryImpl } from '@/infrastructure/repositories/route.repository.impl';
import { CarrierRepositoryImpl } from '@/infrastructure/repositories/carrier.repository.impl';
import { CarrierDatasourceImpl } from '@/infrastructure/datasources/carrier.datasource.impl';
import { RouteDatasourceImpl } from '@/infrastructure/datasources/route.datasource.impl';


//--------------------------------------------//
export class ShipmentRoutes {
  static get routes(): Router {
    const router = Router();

    const shipmentDatasource = new ShipmentDatasourceImpl(); // comunicacion a bd
    const routeDatasource = new RouteDatasourceImpl();
    const carrierDatasource = new CarrierDatasourceImpl();
    const shipmentRepository = new ShipmentRepositoryImpl(shipmentDatasource);
    const routeRepository = new RouteRepositoryImpl(routeDatasource);
    const carrierRepository = new CarrierRepositoryImpl(carrierDatasource);

    const addressValidator = new GoogleMapsAddressValidator(env.GOOGLE_MAPS_API_KEY);
    const shipmentController = new ShipmentController(shipmentRepository, addressValidator, routeRepository, carrierRepository);


    router.post('/create', verifyToken, validateRequest(ShipmentSchema), shipmentController.create)

    router.post('/:id/assign', verifyToken, validateRequest(AssignShipmentSchema), shipmentController.assignShipment)

    router.get('/', verifyToken, validateQueryParams(ShipmentQueryParamsSchema), shipmentController.getAllShipments)

    return router;
  }
}
