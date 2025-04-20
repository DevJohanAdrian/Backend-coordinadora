import { CreateShipmentDto, AssignShipmentDto, GetAllShipmentsDto } from '@/application/dtos'
import { ShipmentEntity } from '@/domain'

export abstract class ShipmentDataSource {
  abstract create(data: CreateShipmentDto): Promise<ShipmentEntity>;
  abstract assignShipment(data: AssignShipmentDto): Promise<ShipmentEntity>;
  abstract getShipmentById(id: number): Promise<ShipmentEntity>;
  abstract getAllShipments(data: GetAllShipmentsDto): Promise<ShipmentEntity[]>;
}