import { z } from 'zod';

export const CarrierQueryParamsSchema = z.object({
  carrierId: z.number({ required_error: 'El id del carrier es requerido' }).optional(),
});

