import express, { Request, Response } from 'express';
import metricsStressTestsRouter from './services/stress_tests';
import metricsTests from './services/tests';
import cors from 'cors';

import { errorHandler } from './errorHandler';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || process.env.DB_PORT || '3005';

const allowedOrigins = [
  'http://localhost:5173', 
  'https://json-manager-gamma.vercel.app'
];

const corsOrigin = (requestOrigin: string | undefined, callback: (err: Error | null, origin?: boolean) => void) => {
  if (!requestOrigin) {
    callback(null, true);
    return;
  }

  if (allowedOrigins.indexOf(requestOrigin) !== -1) {
    callback(null, true);
    return;
  }

  callback(new Error('Not allowed by CORS'));
};

app.use(
  cors({
    origin: corsOrigin,
  })
);


app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'jsonmanager-backend' });
});

app.get('/info/version', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/stress', metricsStressTestsRouter);
app.use('/', metricsTests);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
