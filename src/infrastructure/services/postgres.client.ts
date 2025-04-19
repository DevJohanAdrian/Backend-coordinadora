import { Pool } from 'pg';
import env from '@/presentation/express/config/envs';


export const pgPool = new Pool({
  host: env.HOST,
  port: Number(env.POSTGRES_PORT),
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
});