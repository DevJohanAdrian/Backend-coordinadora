import { CarrierRepository, ShipmentRepository, RouteRepository } from '@/application/interfaces'
import { AssignShipmentDto } from '@/application/dtos'
import { ShipmentEntity } from '@/domain/entities/shipment.entity'
import { CustomError } from '@/application/customErrors/errors';
export interface IAssignShipmentUseCase {
  execute(dto: AssignShipmentDto): Promise<ShipmentEntity>;
}

export class AssignShipmentUseCase implements IAssignShipmentUseCase {
  constructor(private readonly shipmentRepo: ShipmentRepository,
    private readonly carrierRepo: CarrierRepository,
    private readonly routeRepo: RouteRepository,
  ) {}

  async execute(dto: AssignShipmentDto) {
    const shipment = await this.shipmentRepo.getShipmentById(dto.shipmentId);
    const carrier = await this.carrierRepo.getAllCarriers({carrierId: dto.carrierId});
    const route = await this.routeRepo.getAllRoutes({routeId: dto.routeId});

    const carrierEntity = carrier[0];
    const routeEntity = route[0];

    //Validations
    if(!shipment) {
      throw new CustomError('Envío no encontrado.');
    }
    if(!carrierEntity) {
      throw new CustomError('Transportista no encontrado.');
    }
    if(!routeEntity) {
      throw new CustomError('Ruta no encontrada.');
    }

    if(carrierEntity.available === false || !carrierEntity.available) {
      throw new CustomError('Transportista no disponible.');
    }

    if (routeEntity.active === false || !routeEntity.active) {
      throw new CustomError('Ruta no activa.');
    }

    if(carrierEntity.capacity_kg < shipment.weight || carrierEntity.max_capacity_kg < shipment.weight) {
      throw new CustomError('Transportista no tiene capacidad suficiente.');
    }

    return this.shipmentRepo.assignShipment(dto);
  }
}
