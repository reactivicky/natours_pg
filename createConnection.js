import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: process.env.USER,
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

export default client;
