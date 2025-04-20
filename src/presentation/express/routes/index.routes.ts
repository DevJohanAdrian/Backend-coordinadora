import { Router } from 'express';
import { UserRoutes } from '../modules/user/userRouter';
import { ShipmentRoutes } from '../modules/shipment/shipmentRouter';

import { healthCheckRouter } from '../modules/healthCheck/healthCheckRouter';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/users', UserRoutes.routes);
    router.use('/shipments', ShipmentRoutes.routes);
    router.use('/health-check', healthCheckRouter);

    return router;
  }
}
