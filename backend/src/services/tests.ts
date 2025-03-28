// Desc: IMetrics service
import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import pool from '../db';
import { IAllTimeTestClient, ITestClient } from '../types';
import { dbNames } from '../constants/dbNames';
import { ApiResponse } from '../types/apiResponse';
import { createResponse } from '../utils/createResponse';

const router = express.Router();

router.get(
  '/tests',
  asyncHandler(async (_: Request, res: Response<ApiResponse<{ results: IAllTimeTestClient[]; test_names: string[] }>>) => {
    const resultsQuery = await pool.query(`
      SELECT
        p.id,
        p.time,
        p.status,
        p.workers,
        p.comment,
        p.timestamp as date,
        COALESCE(json_agg(t.*) FILTER (WHERE t.id IS NOT NULL), '[]') AS tests
      FROM ${dbNames[1]} p
      LEFT JOIN ${dbNames[2]} t ON t.parent = p.id
      GROUP BY p.id, p.time, p.timestamp
      ORDER BY p.timestamp DESC
    `);

    const uniqueNamesResult = await pool.query(`SELECT unique_names FROM unique_test_names`);
    const unique_names: string[] = uniqueNamesResult.rows[0].unique_names || [];

    res.status(200).json(createResponse(
      { results: resultsQuery.rows, test_names: unique_names },
      null,
      null,
      true
    ));
  })
);

router.post(
  '/tests/add',
  asyncHandler(async (req: Request<{}, {}, { tests: ITestClient[]; all_time: number; status: string; workers: number }>, res: Response<ApiResponse<null>>) => {
    const { tests, all_time, status, workers } = req.body;

    if (!tests || !all_time) {
      res.status(400).json(createResponse(null, null, 'Некорректные данные', false));
      return;
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const new_test = await client.query(
        `INSERT INTO ${dbNames[1]} (time, status, workers)
         VALUES ($1, $2, $3) RETURNING *`,
        [all_time, status, workers]
      );

      const test_id = new_test.rows[0].id;

      if (tests.length > 0) {
        const values = tests.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`);
        const params = tests.flatMap(test => [test.time, test.test_name, test_id, test.status]);

        await client.query(
          `INSERT INTO ${dbNames[2]} (time, test_name, parent, status) VALUES ${values}`,
          params
        );
      }

      await client.query(`REFRESH MATERIALIZED VIEW unique_test_names`);

      await client.query('COMMIT');
      res.status(200).json(createResponse(null, 'Тест успешно добавлен', null, true));
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Transaction failed:', error);
      res.status(500).json(createResponse(null, null, 'Ошибка при добавлении теста', false));
    } finally {
      client.release();
    }
  })
);

router.get(
  '/test',
  asyncHandler(async (req: Request<{}, {}, {}, { name: string }>, res: Response<ApiResponse<any>>) => {
    const { name } = req.query;
    const result = await pool.query(
      `
      SELECT
        t.id,
        t.test_name AS name,
        t.time,
        p.timestamp AS date
      FROM ${dbNames[2]} t 
      LEFT JOIN ${dbNames[1]} p on p.id = t.parent
      WHERE t.test_name = $1
      `, [name]
    );

    res.status(200).json(createResponse(result.rows, null, null, true));
  })
);

router.delete('/tests', asyncHandler(async (req: Request, res: Response<ApiResponse<null>>) => {
  await pool.query(
    ` 
    DELETE FROM ${dbNames[1]};
    DELETE FROM ${dbNames[2]};
    `
  );
  res.status(200).json(createResponse(null, 'Deleted all tests', null, true));
}));

router.put(
  '/tests/add-comment/main',
  asyncHandler(async (
    req: Request<{}, {}, { id: number; comment?: string }>,
    res: Response<ApiResponse<any>>
  ) => {
    const { id, comment } = req.body;
    if (!id) {
      res.status(400).json(createResponse(null, null, 'Некорректные данные', false));
      return;
    }
    const commentToSave = comment && comment.trim() !== '' ? comment : null;

    const result = await pool.query(
      `UPDATE ${dbNames[1]} SET comment = $1 WHERE id = $2 RETURNING *`,
      [commentToSave, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json(createResponse(null, null, 'Запись не найдена', false));
      return;
    }

    res.status(200).json(createResponse(result.rows[0], 'Комментарий успешно добавлен к основной записи', null, true));
  })
);

router.put(
  '/tests/add-comment/test',
  asyncHandler(async (
    req: Request<{}, {}, { id: number; comment?: string }>,
    res: Response<ApiResponse<any>>
  ) => {
    const { id, comment } = req.body;
    if (!id) {
      res.status(400).json(createResponse(null, null, 'Некорректные данные', false));
      return;
    }
    const commentToSave = comment && comment.trim() !== '' ? comment : null;

    const result = await pool.query(
      `UPDATE ${dbNames[2]} SET comment = $1 WHERE id = $2 RETURNING *`,
      [commentToSave, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json(createResponse(null, null, 'Запись не найдена', false));
      return;
    }

    res.status(200).json(createResponse(result.rows[0], 'Комментарий успешно добавлен к тесту', null, true));
  })
);

export default router;