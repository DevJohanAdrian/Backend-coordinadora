export interface AddressValidator {
    validateAddress(address: string): Promise<boolean>;
  }