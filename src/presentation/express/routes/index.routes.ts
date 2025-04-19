import { Router } from 'express';
import { UserRoutes } from '../modules/user/userRouter';
import { healthCheckRouter } from '../modules/healthCheck/healthCheckRouter';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/users', UserRoutes.routes);
    router.use('/health-check', healthCheckRouter);

    return router;
  }
}
