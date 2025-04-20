import { CarrierEntity } from '@/domain'
import { GetAllCarriersDto } from '@/application/dtos'
;
export abstract class CarrierDataSource {
  abstract getAllCarriers(data: GetAllCarriersDto): Promise<Array<CarrierEntity>>;
}