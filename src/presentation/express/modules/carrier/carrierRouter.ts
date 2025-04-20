


import { verifyToken } from '@presentation/express/common/middleware/verifyToken';
import { Router } from 'express';
import { CarrierController } from './carrierController';
import { CarrierQueryParamsSchema } from './carrierModel';
import { CarrierDatasourceImpl } from '@/infrastructure/datasources/carrier.datasource.impl';
import { CarrierRepositoryImpl } from '@/infrastructure/repositories/carrier.repository.impl';
import validateQueryParams  from '@presentation/express/common/middleware/validateQueryParams';


//--------------------------------------------//
export class CarrierRoutes {
  static get routes(): Router {
    const router = Router();

    const carrierDatasource = new CarrierDatasourceImpl(); // comunicacion a bd
    const carrierRepository = new CarrierRepositoryImpl(carrierDatasource);
    const carrierController = new CarrierController(carrierRepository);

    router.get('/', verifyToken, validateQueryParams(CarrierQueryParamsSchema), carrierController.getAllCarriers)

    return router;
  }
}
