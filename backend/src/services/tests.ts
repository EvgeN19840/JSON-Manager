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
    const result = await pool.query(`SELECT * FROM ${dbNames[1]}`);
    if (result.rowCount === 0) {
      res.status(404).json({
        results: [],
        test_names: []
      });
      return;
    }

    const rows = await Promise.all(result.rows.map(async (item) => {
      const tests = await pool.query(`SELECT * FROM ${dbNames[2]} WHERE parent = $1`, [item.id]);

      return {
        id: item.id,
        time: item.time,
        tests: tests.rows,
        data: item.timestamp
      }
    }));

    const unique_names = await pool.query(`SELECT array_agg(DISTINCT test_name) FROM ${dbNames[2]}`);


    res.json({
      results: rows,
      test_names: unique_names.rows[0].array_agg
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

    tests.forEach(async (test) => {
      await pool.query(
        `INSERT INTO ${dbNames[2]} (time, test_name, parent)
          VALUES ($1, $2, $3)`,
        [test.time, test.test_name, test_id],
      );
    });

    res.status(200).send("Тест успешно добавлен");
  })
)

router.get(
  '/test',
  asyncHandler(async (req: Request<{}, {}, {}, { name: string }>, res: Response) => {
    const { name } = req.query;
    const result = await pool.query(`SELECT * FROM ${dbNames[2]} WHERE test_name = $1`, [name]);
    const rows = await Promise.all(result.rows.map(async (item) => {
      const tests = await pool.query(`SELECT * FROM ${dbNames[1]} WHERE id = $1`, [item.parent]);

      return {
        id: item.id,
        time: item.time,
        test_name: item.test_name,
        data: tests.rows[0].timestamp
      }
    }));


    res.json(rows);
  })
)


export default router;