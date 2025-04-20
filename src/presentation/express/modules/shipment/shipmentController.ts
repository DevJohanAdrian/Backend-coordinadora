import { Request, Response } from 'express'
import { CreateShipmentUseCase } from '@/application/use-cases'
import type { ShipmentRepository } from '@/application/interfaces';
import { handleCatchErrorAsync } from '../../common/utils';
import { AddressValidator } from '@/application/services/addressValidator';
;
export class ShipmentController {
  constructor(private readonly shipmentRepository: ShipmentRepository
    , private readonly addressValidator: AddressValidator
  ) { }

  public create = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const userId = req.userId // Asumiendo autenticación JWT
    const dto = { ...req.body, userId }
    console.log("entre", dto)
    const shipment = await new CreateShipmentUseCase(this.shipmentRepository, this.addressValidator).execute(dto)
    res.status(201).json(shipment)
  })
}
