import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _: Request, res: Response, __: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}