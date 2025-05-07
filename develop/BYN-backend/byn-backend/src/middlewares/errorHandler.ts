import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/ApiError';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  } else {
    console.error('❌ Error no controlado:', err);
    res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
};
