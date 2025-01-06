import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMw implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`Petición: [${req.method}] en la ruta: [${req.url}]`);
    next();
  }
}

export const LoggerMwGlobal = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(
    `Petición: [${req.method}] en la ruta: [${req.url}] ${new Date().toLocaleDateString()}`,
  );
  next();
};
