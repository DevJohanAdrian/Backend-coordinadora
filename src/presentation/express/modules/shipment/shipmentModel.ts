import { z } from 'zod';

export const ShipmentSchema = z.object({
  productType: z.string({ required_error: 'El tipo de producto es requerido' }),
  street: z.string({ required_error: 'La dirección es requerida' }),
  city: z.string({ required_error: 'La ciudad es requerida' }),
  state: z.string({ required_error: 'El departamento es requerido' }),
  zipCode: z.string({ required_error: 'El código postal es requerido' }),
  weight: z.number({ required_error: 'El peso es requerido', invalid_type_error: 'El peso debe ser numérico' }).positive('El peso debe ser positivo'),
  height: z.number({ required_error: 'La altura es requerida', invalid_type_error: 'La altura debe ser numérica' }).positive('La altura debe ser positiva'),
  width: z.number({ required_error: 'El ancho es requerido', invalid_type_error: 'El ancho debe ser numérico' }).positive('El ancho debe ser positivo'),
  length: z.number({ required_error: 'El largo es requerido', invalid_type_error: 'El largo debe ser numérico' }).positive('El largo debe ser positivo'),
  status: z.string({ required_error: 'El estado es requerido' }),
});
