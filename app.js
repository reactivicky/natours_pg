import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(morgan('dev'));

// Middleware to parse JSON bodies, limited to 10KB
app.use(express.json({ limit: '10kb' }));
// Middleware to parse URL-encoded bodies, limited to 10KB
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
