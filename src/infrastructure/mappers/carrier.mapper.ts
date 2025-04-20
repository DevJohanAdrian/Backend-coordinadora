import { CarrierEntity } from '@/domain';
export class CarrierMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(carrier: any): CarrierEntity {
    return new CarrierEntity(carrier.id, carrier.name, carrier.phone, carrier.vehicle_plate, carrier.vehicle_type, carrier.capacity_kg, carrier.max_capacity_kg, carrier.available, carrier.current_location);
  }
}
