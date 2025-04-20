import { ShipmentEntity } from '@/domain';
export class ShipmentMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(shipment: any): ShipmentEntity {
    return new ShipmentEntity(shipment.id, shipment.product_type, shipment.street, shipment.city, shipment.state, shipment.zip_code, shipment.weight, shipment.height, shipment.width, shipment.length, shipment.user_id, shipment.status, shipment.ruta_id, shipment.carrier_id);
  }
}
