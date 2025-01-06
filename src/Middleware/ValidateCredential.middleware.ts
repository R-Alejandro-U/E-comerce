import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCredential implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const searchFilter: string[] = Object.keys(req.body);
    const filtered: string[] = searchFilter.filter((data) => !req.body[data]);
    if (filtered.length) {
      res.status(400).json({
        message: `Es necesesaria la informacion de: ${filtered.join(', ')}`,
      });
    } else {
      next();
    }
  }
}
