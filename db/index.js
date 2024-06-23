import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export const query = (text, params) => pool.query(text, params);

export const connect = async () => await pool.connect();
