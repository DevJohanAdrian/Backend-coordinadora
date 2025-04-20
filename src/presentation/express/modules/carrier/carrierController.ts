import { Request, Response } from 'express'
import { GetAllCarrierUseCase } from '@/application/use-cases'
import type { CarrierRepository } from '@/application/interfaces';
import { handleCatchErrorAsync } from '../../common/utils';
;
export class CarrierController {
  constructor(private readonly carrierRepository: CarrierRepository) { }


  public getAllCarriers = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { carrierId } = req.query;
    const carriers = await new GetAllCarrierUseCase(this.carrierRepository).execute({ carrierId: Number(carrierId) });
    res.status(200).json(carriers);
  })
}
