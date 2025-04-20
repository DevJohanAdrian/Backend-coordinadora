import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number; // o string, según tu implementación
  }
}