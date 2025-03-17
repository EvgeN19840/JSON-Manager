import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'metrics_db',
  password: '3l%I8z12', 
  port: 5432,
});

export default pool;