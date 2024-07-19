import app from './app.js';
import { checkDatabaseConnection } from './db/index.js';

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await checkDatabaseConnection();
    console.log(`App listening on port ${port}...`);
  } catch (error) {
    console.error('Could not connect to db!', error);
  }
});
