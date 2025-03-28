import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import pool from '../db';
import { dbNames } from '../constants/dbNames';
import { ApiResponse } from '../types/apiResponse';
import { IMetrics } from '../types';
import { createResponse } from '../utils/createResponse';

const router = express.Router();

router.post(
  '/metrics',
  asyncHandler(async (req: Request<{}, {}, IMetrics>, res: Response<ApiResponse<null>>) => {
    const { payrollRun, upload, apply, payrollrest, api_version } = req.body;
    if (!payrollRun || !upload || !apply || !payrollrest || !api_version) {
      res.status(400).json(createResponse(null, null, 'Некорректные данные', false));
      return;
    }

    await pool.query(
      `INSERT INTO ${dbNames[3]} (payrollRun, upload, apply, payrollrest, api_version)
        VALUES ($1, $2, $3, $4, $5)`,
      [payrollRun, upload, apply, payrollrest, api_version],
    );

    res.status(200).json(createResponse(null, 'Метрика успешно добавлена', null, true));
  })
);

router.patch(
  '/metrics/comment',
  asyncHandler(async (
    req: Request<{}, {}, { id: number; comment: string }>,
    res: Response<ApiResponse>
  ) => {
    const { id, comment } = req.body;
    const result = await pool.query(
      `UPDATE ${dbNames[3]} SET comment = $1 WHERE id = $2`,
      [comment, id],
    );
    if (result.rowCount === 0) {
      res.status(404).json(createResponse(null, null, `Метрика с id ${id} не найдена`, false));
      return;
    }

    const row = await pool.query(`SELECT * FROM ${dbNames[3]} WHERE id = $1`, [id]);
    res.status(200).json(createResponse(row.rows[0], 'Комментарий успешно обновлён', null, true));
  })
);

router.delete(
  '/metrics',
  asyncHandler(async (req: Request<{}, {}, {}, { id: string }>, res: Response<ApiResponse<null>>) => {
    const id = parseInt(req.query.id, 10);
    if (isNaN(id)) {
      res.status(400).json(createResponse(null, null, 'Некорректный id', false));
      return;
    }

    const row = await pool.query(`SELECT * FROM ${dbNames[3]} WHERE id = $1`, [id]);
    if (row.rowCount === 0) {
      res.status(404).json(createResponse(null, null, `Метрика с id ${id} не найдена`, false));
      return;
    }

    const delete_row = await pool.query(`UPDATE ${dbNames[3]} SET is_deleted = $1 WHERE id = $2`, [true, id]);
    if (delete_row.rowCount === 0) {
      res.status(500).json(createResponse(null, null, 'Ошибка удаления метрики', false));
      return;
    }

    res.status(200).json(createResponse(null, 'Метрика успешно удалена', null, true));
  })
);

export default router;