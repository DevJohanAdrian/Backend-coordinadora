import { AddressValidator } from '@/application/services/addressValidator';
import axios from 'axios';

export class GoogleMapsAddressValidator implements AddressValidator {
  constructor(private readonly apiKey: string) {}

  async validateAddress(address: string): Promise<boolean> {
    const encoded = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${this.apiKey}`;
    const res = await axios.get(url);
    const data = res.data;
    console.log("direccion data", data);

    if (data.status !== 'OK' || !data.results.length) {
      throw new Error('Dirección no encontrada o inválida según Google Maps');
    }

    const result = data.results[0];
    // Si es coincidencia parcial, también lo rechazamos
    if (result.partial_match) {
      throw new Error('La dirección no es exacta (partial match) según Google Maps');
    }
    // Solo aceptamos tipos de dirección exactos
    const isExactType = result.types.includes('street_address') || result.types.includes('premise');
    if (!isExactType) {
      throw new Error('La dirección encontrada no es una dirección exacta (street_address/premise)');
    }
    return true;
  }
}