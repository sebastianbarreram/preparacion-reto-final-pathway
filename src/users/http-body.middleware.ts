import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Body...', req.body);
    if (req.params.uuid != undefined) {
      console.log(req.params);
    }
    next();
  }
}
