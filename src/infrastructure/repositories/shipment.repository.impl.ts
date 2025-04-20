import type { CreateShipmentDto, AssignShipmentDto, GetAllShipmentsDto } from '@/application/dtos';
import type { ShipmentRepository, ShipmentDataSource } from '@/application/interfaces/index';
import type { ShipmentEntity } from '@/domain';

export class ShipmentRepositoryImpl implements ShipmentRepository {
  constructor(private readonly shipmentDatastore: ShipmentDataSource) {}

  create(data: CreateShipmentDto): Promise<ShipmentEntity> {
    return this.shipmentDatastore.create(data);
  }
  
  assignShipment(data: AssignShipmentDto): Promise<ShipmentEntity> {
    return this.shipmentDatastore.assignShipment(data);
  }

  getShipmentById(id: number): Promise<ShipmentEntity> {
    return this.shipmentDatastore.getShipmentById(id);
  }

  getAllShipments(data: GetAllShipmentsDto): Promise<ShipmentEntity[]> {
    return this.shipmentDatastore.getAllShipments(data);
  }
  
}
