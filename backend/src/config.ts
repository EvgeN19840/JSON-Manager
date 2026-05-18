import dotenv from 'dotenv';

dotenv.config();

const getEnv = (...keys: string[]) => keys.find((key) => process.env[key]) ? process.env[keys.find((key) => process.env[key]) as string] : undefined;

export const dbConfig = {
  user: getEnv('PGUSER', 'DB_USER'),
  host: getEnv('PGHOST', 'DB_HOST'),
  database: getEnv('PGDATABASE', 'DB_DATABASE'),
  password: getEnv('PGPASSWORD', 'DB_PASSWORD'),
  port: parseInt(getEnv('PGPORT', 'DB_PORT') || '5432', 10),
};
