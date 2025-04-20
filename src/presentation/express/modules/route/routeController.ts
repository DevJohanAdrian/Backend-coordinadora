import { Request, Response } from 'express'
import { GetAllRouteUseCase } from '@/application/use-cases'
import type { RouteRepository } from '@/application/interfaces';
import { handleCatchErrorAsync } from '../../common/utils';
;
export class RouteController {
  constructor(private readonly routeRepository: RouteRepository) { }


  public getAllRoutes = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { routeId } = req.query;
    const routes = await new GetAllRouteUseCase(this.routeRepository).execute({ routeId: Number(routeId) });
    res.status(200).json(routes);
  })
}

