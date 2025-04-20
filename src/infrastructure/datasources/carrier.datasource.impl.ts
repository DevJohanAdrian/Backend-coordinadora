
import { pgPool } from '@/infrastructure/services/postgres.client'
import { GetAllCarriersDto } from '@/application/dtos'
import { CarrierEntity } from '@/domain'
import { CarrierMapper } from '@/infrastructure/mappers/carrier.mapper'
export class CarrierDatasourceImpl {
 
  
  async getAllCarriers(data: GetAllCarriersDto): Promise<Array<CarrierEntity>> {
    const { carrierId } = data;
    const carriers = await pgPool.query(
      `
        SELECT * FROM carriers
        WHERE
          ($1::int IS NULL OR id = $1)
      `,
      [
        carrierId ?? null
      ]
    );
    return carriers.rows.map(carrier => CarrierMapper.toDomain(carrier));
  }
}
    

