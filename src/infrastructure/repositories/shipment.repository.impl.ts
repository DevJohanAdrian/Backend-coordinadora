import type { CreateShipmentDto } from '@/application/dtos';
import type { ShipmentRepository, ShipmentDataSource } from '@/application/interfaces/index';
import type { ShipmentEntity } from '@/domain/entities/shipment.entity';

export class ShipmentRepositoryImpl implements ShipmentRepository {
  constructor(private readonly shipmentDatastore: ShipmentDataSource) {}

  create(data: CreateShipmentDto): Promise<ShipmentEntity> {
    return this.shipmentDatastore.create(data);
  }
 
}
