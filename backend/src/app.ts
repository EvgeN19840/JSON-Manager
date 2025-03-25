import express from 'express';
import metricsStressTestsRouter from './services/stress_tests';
import metricsTests from './services/tests';
import cors from 'cors';

import { errorHandler } from './errorHandler';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.DB_PORT

const allowedOrigins = [
  'http://localhost:5173', 
  'https://json-manager-gamma.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);


app.use(express.json());
app.use('/stress', metricsStressTestsRouter);
app.use('/', metricsTests);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});