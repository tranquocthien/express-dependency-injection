import { NextFunction, Request, Response } from 'express';

export default function logErrorMiddlerware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  next(error);
}
