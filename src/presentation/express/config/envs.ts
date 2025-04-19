import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';

// Cargar variables de entorno desde .env
dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['development', 'production', 'test']
  }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  POSTGRES_USER: str({ devDefault: testOnly('super_admin') }),
  POSTGRES_PASSWORD: str({ devDefault: testOnly('123456') }),
  POSTGRES_DB: str({ devDefault: testOnly('coordinadora') }),
  POSTGRES_PORT: num({ devDefault: testOnly(5432) }),
  SECRETKEY: str({ devDefault: testOnly('thisIsMySecretKey') }),
  REFRESHSECRETKEY: str({ devDefault: testOnly('thisIsMyRefreshSecretKey') }),
  DATABASE_URL: str({
    devDefault: testOnly(
      'postgresql://super_admin:123456@localhost:5432/coordinadora'
    )
  })
});

export default env;
