export class ShipmentEntity {
    constructor(
      public id: number | null,
      public productType: string,
      public street: string,
      public city: string,
      public state: string,
      public zipCode: string,
      public weight: number,
      public height: number,
      public width: number,
      public length: number,
      public userId: number | null, // para asociar con el usuario autenticado
      public status: string
    ) {}
  }