
import { pgPool } from '@/infrastructure/services/postgres.client'
import { CreateShipmentDto } from '@/application/dtos/shipment/createShipmentDto'
import { ShipmentEntity } from '@/domain/entities/shipment.entity'

export class ShipmentDatasourceImpl {
  async create(dto: CreateShipmentDto): Promise<ShipmentEntity> {
    console.log('data', dto)
    const query = `
      INSERT INTO shipments (product_type, street, city, state, zip_code, weight, height, width, length, user_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `
    const values = [
      dto.productType, dto.street, dto.city, dto.state, dto.zipCode,
      dto.weight, dto.height, dto.width, dto.length, dto.userId
    ]
    const result = await pgPool.query(query, values)
    const row = result.rows[0];
    return new ShipmentEntity( row.id,
        row.product_type,
        row.street,
        row.city,
        row.state,
        row.zip_code,
        row.weight,
        row.height,
        row.width,
        row.length,
        row.user_id,
        row.status
    )
  }
}