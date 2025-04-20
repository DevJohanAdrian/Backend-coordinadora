export class CarrierEntity {
    constructor(
      public id: number | null,
      public name: string,
      public phone: string,
      public vehicle_plate: string,
      public vehicle_type: string,
      public capacity_kg: number,
      public max_capacity_kg: number,
      public available: boolean,
      public current_location: string,
    ) {}
  }
