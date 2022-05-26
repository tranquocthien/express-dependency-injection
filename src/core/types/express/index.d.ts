import { Response } from 'express-serve-static-core';
declare global {
  namespace Express {
    export interface Response {
      success(
        data: any,
        message?: string | undefined,
        pagination?: any | undefined
      ): Response;
      error(message: string, code?: number | undefined);
    }
  }
}
