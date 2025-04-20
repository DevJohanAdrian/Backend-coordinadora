import { Request, Response } from 'express'
import { CreateShipmentUseCase, AssignShipmentUseCase, GetAllShipmentUseCase } from '@/application/use-cases'
import type { CarrierRepository, RouteRepository, ShipmentRepository } from '@/application/interfaces';
import { handleCatchErrorAsync } from '../../common/utils';
import { AddressValidator } from '@/application/services/addressValidator';
;
export class ShipmentController {
  constructor(private readonly shipmentRepository: ShipmentRepository
    , private readonly addressValidator: AddressValidator,
    private readonly routeRepository: RouteRepository,
    private readonly carrierRepository: CarrierRepository
  ) { }

  public create = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const userId = req.userId // Asumiendo autenticación JWT
    const dto = { ...req.body, userId }
    const shipment = await new CreateShipmentUseCase(this.shipmentRepository, this.addressValidator).execute(dto)
    res.status(201).json(shipment)
  })

  public assignShipment = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { routeId, carrierId } = req.body
    const shipmentId = Number(req.params.id)
    const shipment = await new AssignShipmentUseCase(this.shipmentRepository, this.carrierRepository, this.routeRepository).execute({ shipmentId, routeId, carrierId })
    res.status(200).json(shipment)
  })

  public getAllShipments = handleCatchErrorAsync(async (req: Request, res: Response) => {
    const { status, routeId, carrierId } = req.query;
    const shipments = await new GetAllShipmentUseCase(this.shipmentRepository).execute({ status: status as string, routeId: Number(routeId), carrierId: Number(carrierId) });
    res.status(200).json(shipments);
  })
}
