import { openAPIRouter } from '@presentation/express/api-docs/openAPIRouter';
import errorHandler from '@presentation/express/common/middleware/errorHandler';
import rateLimiter from '@presentation/express/common/middleware/rateLimiter';
import finalErrorHandler from '@presentation/express/common/middleware/finalErrorHandler';
import requestLogger from '@presentation/express/common/middleware/requestLogger';
import env from '@/presentation/express/config/envs';
import compression from 'compression';
import cors from 'cors';
import express, { type Router, type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import cookieParser from 'cookie-parser';

import { type Server as HttpServer, createServer } from 'node:http'; // Para crear el servidor HTTP
// import path from 'node:path';

const logger = pino({ name: 'server start' });

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

class Server {
  public readonly app: Express = express(); // se cambio a public para hacer uso de el en pruebas
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private server!: HttpServer; // Tipo HttpServer para tener acceso a .close()

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Set the application to trust the reverse proxy
    this.app.set('trust proxy', true);

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(cors({ origin: env.CORS_ORIGIN, credentials: true , allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'refresh']}));
    this.app.use(helmet());
    this.app.use(rateLimiter);
    this.app.use(compression());
    this.app.use(cookieParser());

    //* Request logging
    this.app.use(requestLogger);

    //* Routes
    this.app.use('/v1/api', this.routes);

    //* Swagger UI
    this.app.use('/docs', openAPIRouter);

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    // //* SPA
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join(`${__dirname}../../../${this.publicPath}/index.html`);
    //   res.sendFile(indexPath);
    // });

    //* Error handlers
    this.app.use(...errorHandler()); // 404 y logging
    this.app.use(finalErrorHandler); // ESTE responde al cliente con el error

    //* Crear servidor HTTP
    this.server = createServer(this.app);

    this.server.listen(this.port, () => {
      const { NODE_ENV, HOST, PORT } = env;
      // console.log(`Server running on port ${this.port}`);
      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
      logger.info(`Swagger docs (${NODE_ENV}) running on port http://localhost:${PORT}/docs/`);
    });

    //* keep alive
    // Establece el tiempo en milisegundos que el servidor mantendrá una conexión abierta sin actividad
    this.server.keepAliveTimeout = 60 * 1000 + 1000; // 61 segundos
    // Establece el tiempo máximo para recibir todos los encabezados antes de cerrar la conexión
    this.server.headersTimeout = 60 * 1000 + 2000; // 62 segundos
  }

  public isRunning(): boolean {
    return this.server && this.server.listening;
  }

  public close() {
 

    if (this.server) {
      this.server.close(err => {
        if (err) {
          logger.error('Error closing server:', err);
        } else {
          logger.info('Server closed');
        }
      });
    }
  }
}

export { Server };
