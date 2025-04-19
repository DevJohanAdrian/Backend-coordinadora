import type { NextFunction, Request, Response } from 'express';


// Higher-order function para manejar errores de funciones asíncronas
export const handleCatchErrorAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: unknown) => next(err));
  };
};
