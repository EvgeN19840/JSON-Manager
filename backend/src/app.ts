import express from 'express';
import metricsStressTestsRouter from './services/stress_tests';
import metricsTests from './services/tests';

import { errorHandler } from './errorHandler';

const app = express();
const port = 3004;

app.use(express.json());
app.use('/stress', metricsStressTestsRouter);
app.use('/', metricsTests);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});