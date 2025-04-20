import type { ShipmentRepository } from '@/application/interfaces';
import type { GetAllShipmentsDto } from '@/application/dtos';
import type { ShipmentEntity } from '@/domain';

export interface IGetAllShipmentUse {
  execute(data: GetAllShipmentsDto): Promise<Array<ShipmentEntity>>;
}

export class GetAllShipmentUseCase implements IGetAllShipmentUse {
  constructor(private readonly repository: ShipmentRepository) {}

  execute(data: GetAllShipmentsDto): Promise<Array<ShipmentEntity>> {
    return this.repository.getAllShipments(data);
  }
}
