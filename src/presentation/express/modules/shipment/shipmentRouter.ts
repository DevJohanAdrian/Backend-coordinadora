

import { ShipmentRepositoryImpl } from '@/infrastructure/repositories/shipment.repository.impl'
import { ShipmentDatasourceImpl } from '@/infrastructure/datasources/shipment.datasource.impl'
import { validateRequest } from '@presentation/express/common/utils';
import { verifyToken } from '@presentation/express/common/middleware/verifyToken';
import { Router } from 'express';
import { z } from 'zod';
import { ShipmentController } from './shipmentController';
import { ShipmentSchema } from './shipmentModel';
import { GoogleMapsAddressValidator } from '@/infrastructure/services/GoogleMapsAddressValidator';
import env from '@/presentation/express/config/envs';


//--------------------------------------------//
export class ShipmentRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ShipmentDatasourceImpl(); // comunicacion a bd
    const shipmentRepository = new ShipmentRepositoryImpl(datasource);
    const addressValidator = new GoogleMapsAddressValidator(env.GOOGLE_MAPS_API_KEY);
    const shipmentController = new ShipmentController(shipmentRepository, addressValidator);


    router.post('/create', verifyToken, validateRequest(ShipmentSchema), shipmentController.create)

    return router;
  }
}
