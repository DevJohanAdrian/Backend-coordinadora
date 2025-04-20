import { CreateShipmentDto } from '@/application/dtos/shipment/createShipmentDto'
import { ShipmentEntity } from '@/domain/entities/shipment.entity'

export abstract class ShipmentRepository {
  abstract create(data: CreateShipmentDto): Promise<ShipmentEntity>;
}