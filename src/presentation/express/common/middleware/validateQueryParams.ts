import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
 const validateQueryParams =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (err: any) {
      const messages =
        err.errors?.map((errorDetail: any) => errorDetail.message) || [err.message];
      res.status(400).json({ error: messages });
    }
  };
export default validateQueryParams

