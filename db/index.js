import knex from 'knex';

const connectionOptions = {
  client: 'pg',
  connection: {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  },
};

export const pg = knex(connectionOptions);

export const checkDatabaseConnection = async () => {
  try {
    await pg.raw('SELECT 1');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};
