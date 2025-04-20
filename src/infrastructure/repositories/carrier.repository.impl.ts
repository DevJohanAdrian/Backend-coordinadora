import type { GetAllCarriersDto } from '@/application/dtos';
import type { CarrierRepository, CarrierDataSource } from '@/application/interfaces';
import type { CarrierEntity } from '@/domain';

export class CarrierRepositoryImpl implements CarrierRepository {
  constructor(private readonly carrierDatastore: CarrierDataSource) {}

  getAllCarriers(data: GetAllCarriersDto): Promise<CarrierEntity[]> {
    return this.carrierDatastore.getAllCarriers(data);
  }
  
}
