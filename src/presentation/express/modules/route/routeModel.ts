import { z } from 'zod';

export const RouteQueryParamsSchema = z.object({
  routeId: z.number({ required_error: 'El id de la ruta es requerido' }).optional(),
});

