import express from 'express';
import metricsStressTestsRouter from './services/stress_tests';
import metricsTests from './services/tests';

import { errorHandler } from './errorHandler';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.APP_PORT

app.use(express.json());
app.use('/stress', metricsStressTestsRouter);
app.use('/', metricsTests);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});