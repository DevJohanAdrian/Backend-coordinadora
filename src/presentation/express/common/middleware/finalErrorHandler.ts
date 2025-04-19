import { CustomError } from '@/application/customErrors/errors';
import type { ErrorRequestHandler } from 'express';

const finalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const code = err.code || undefined;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: true,
    message,
    statusCode
  });
};

export default finalErrorHandler;