import type { CarrierRepository } from '@/application/interfaces';
import type { CarrierEntity } from '@/domain';
import type { GetAllCarriersDto } from '@/application/dtos';

export interface IGetAllCarrierUse {
  execute(data: GetAllCarriersDto): Promise<Array<CarrierEntity>>;
}

export class GetAllCarrierUseCase implements IGetAllCarrierUse {
  constructor(private readonly repository: CarrierRepository) {}

  execute(data: GetAllCarriersDto): Promise<Array<CarrierEntity>> {
    return this.repository.getAllCarriers(data);
  }
}
