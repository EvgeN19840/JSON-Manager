// Desc: IMetrics service
import express, { Request, Response } from 'express';

// ** Utils
import asyncHandler from 'express-async-handler';

// ** Database
import pool from '../db';

// ** Types
import { IMetrics } from '../types';
import { dbNames } from '../constants/dbNames';

const router = express.Router();

router.get(
  '/metrics',
  asyncHandler(async (_: Request, res: Response<IMetrics[]>) => {
    const result = await pool.query(`SELECT * FROM ${dbNames[3]}`);
    res.json(result.rows);
  }),
);

router.post(
  '/metrics',
  asyncHandler(async (req: Request<{}, {}, IMetrics>, res: Response) => {
    const { payrollRun, upload, apply, payrollrest, api_version } = req.body;
    if (!payrollRun || !upload || !apply || !payrollrest || !api_version) {
      res.status(400).send('Некорректные данные');
      return;
    }

    await pool.query(
      `INSERT INTO ${dbNames[3]} (payrollRun, upload, apply, payrollrest, api_version)
        VALUES ($1, $2, $3, $4, $5)`,
      [payrollRun, upload, apply, payrollrest, api_version],
    );

    res.status(200).send("Метрика успешно добавлена");
  }),
);

router.patch(
  '/metrics/comment',
  asyncHandler(
    async (req: Request<{}, {}, { id: number; comment: string }>, res: Response): Promise<void> => {
      const { id, comment } = req.body;
      const result = await pool.query(
        `UPDATE ${dbNames[3]} SET comment = $1 WHERE id = $2`,
        [comment, id],
      );
      if (result.rowCount === 0) {
        res.status(404).json({ error: `Метрика с id ${id} не найдена` });
        return;
      }

      const row = await pool.query(`SELECT * FROM ${dbNames[3]} WHERE id = $1`, [id]);
      res.status(200).json(row.rows[0]);

      return;
    },
  ),
);

router.delete(
  '/metrics',
  asyncHandler(
    async (
      req: Request<{}, {}, {}, { id: string }>,
      res: Response
    ): Promise<void> => {
      const id = parseInt(req.query.id, 10);
      if (isNaN(id)) {
        res.status(400).send('Некорректный id');
        return;
      }

      const row = await pool.query(`SELECT * FROM ${dbNames[3]} WHERE id = $1`, [id]);

      if (row.rowCount === 0) {
        res.status(404).send(`Метрика с id ${id} не найдена`);
        return;
      }

      const delete_row = await pool.query(`UPDATE ${dbNames[3]} SET is_deleted = $1 WHERE id = $2`, [true, id]);

      if (delete_row.rowCount === 0) {
        res.status(500).send('Ошибка удаления метрики');
        return
      }

      res.status(200).send('Метрика успешно удалена');
      return;
    }
  )
);

export default router;