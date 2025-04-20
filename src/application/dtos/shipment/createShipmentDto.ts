export interface CreateShipmentDto {
    productType: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    weight: number;
    height: number;
    width: number;
    length: number;
    userId: number | null;
    status: string;
  }