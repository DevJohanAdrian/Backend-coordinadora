import { ShipmentRepository } from '@/application/interfaces'
import { CreateShipmentDto } from '@/application/dtos/shipment/createShipmentDto'
import { ShipmentEntity } from '@/domain/entities/shipment.entity'
import { AddressValidator } from '@/application/services/addressValidator';

export interface ICreateShipmentUseCase {
  execute(createShipmentDto: CreateShipmentDto): Promise<ShipmentEntity>;
}

export class CreateShipmentUseCase implements ICreateShipmentUseCase {
  constructor(private readonly shipmentRepo: ShipmentRepository,
    private readonly addressValidator: AddressValidator
  ) {}

  // async execute(dto: CreateShipmentDto) {
  //   return this.shipmentRepo.create(dto)
  // }

  async execute(dto: CreateShipmentDto) {
    await this.addressValidator.validateAddress(
      `${dto.street}, ${dto.city}, ${dto.state}, ${dto.zipCode}`
    );
    
    return this.shipmentRepo.create(dto);
  }
}