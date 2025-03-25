// Desc: IMetrics service
import express, { Request, Response } from 'express';

// ** Utils
import asyncHandler from 'express-async-handler';

// ** Database
import pool from '../db';

// ** Types
import { IAllTimeTestClient, ITestClient } from '../types';

// ** Consts
import { dbNames } from '../constants/dbNames';

const router = express.Router();

router.get(
  '/tests',
  asyncHandler(async (_: Request, res: Response<{ results: IAllTimeTestClient[], test_names: string[] } | string>) => {
    const resultsQuery = await pool.query(`
      SELECT
        p.id,
        p.time,
        p.timestamp as date,
        COALESCE(json_agg(t.*) FILTER (WHERE t.id IS NOT NULL), '[]') AS tests
        FROM ${dbNames[1]} p
        LEFT JOIN ${dbNames[2]} t ON t.parent = p.id
        GROUP BY p.id, p.time, p.timestamp
        ORDER BY p.timestamp DESC
    `);

    const uniqueNamesResult = await pool.query(`SELECT unique_names FROM unique_test_names`);
    const unique_names: string[] = uniqueNamesResult.rows[0].unique_names || [];



    res.json({
      results: resultsQuery.rows,
      test_names: unique_names
    });
  }),
);

router.post(
  '/tests/add',
  asyncHandler(async (req: Request<{}, {}, { tests: ITestClient[], all_time: number }>, res: Response<any>) => {
    const { tests, all_time } = req.body;
    if (!tests || !all_time) {
      res.status(400).send('Некорректные данные');
      return;
    }

    const new_test = await pool.query(
      `INSERT INTO ${dbNames[1]} (time)
        VALUES ($1) RETURNING *`,
      [all_time],
    );

    const test_id = new_test.rows[0].id;

    if (tests.length > 0) {
      const values = tests.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
      const params = tests.flatMap(test => [test.time, test.test_name, test_id]);

      const a = await pool.query(
        `INSERT INTO ${dbNames[2]} (time, test_name, parent) VALUES ${values}`,
        params
      );
    }

    await pool.query(`REFRESH MATERIALIZED VIEW unique_test_names`);

    res.status(200).send("Тест успешно добавлен");
  })
)

router.get(
  '/test',
  asyncHandler(async (req: Request<{}, {}, {}, { name: string }>, res: Response) => {
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

    res.json(result.rows);
  })
)


export default router;