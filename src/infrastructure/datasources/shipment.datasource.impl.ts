
import { pgPool } from '@/infrastructure/services/postgres.client'
import { CreateShipmentDto, AssignShipmentDto, GetAllShipmentsDto } from '@/application/dtos'
import { ShipmentEntity } from '@/domain'
import { ShipmentMapper } from '@/infrastructure/mappers/shipment.mapper'
export class ShipmentDatasourceImpl {
  async create(dto: CreateShipmentDto): Promise<ShipmentEntity> {
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
    return ShipmentMapper.toDomain(row)
  }

  async assignShipment(dto: AssignShipmentDto): Promise<ShipmentEntity> {
    console.log('data', dto)
    const query = `
      UPDATE shipments SET route_id = $1, carrier_id = $2 WHERE id = $3
      RETURNING *;
    `
    const values = [dto.routeId, dto.carrierId, dto.shipmentId]
    const result = await pgPool.query(query, values)
    const row = result.rows[0]
    return ShipmentMapper.toDomain(row)
  }

  async getShipmentById(id: number): Promise<ShipmentEntity> {
    const query = `
      SELECT * FROM shipments WHERE id = $1;
    `;
    const result = await pgPool.query(query, [id]);
    const row = result.rows[0];
    return ShipmentMapper.toDomain(row);
  }
  

  
  async getAllShipments(data: GetAllShipmentsDto): Promise<Array<ShipmentEntity>> {
    const { status, routeId, carrierId } = data;
    const shipments = await pgPool.query(
      `
        SELECT * FROM shipments
        WHERE
          ($1::text IS NULL OR status = $1)
          AND ($2::int IS NULL OR route_id = $2)
          AND ($3::int IS NULL OR carrier_id = $3)
      `,
      [
        status ?? null,
        routeId ?? null,
        carrierId ?? null
      ]
    );
    return shipments.rows.map(shipment => ShipmentMapper.toDomain(shipment));
  }
}
    

