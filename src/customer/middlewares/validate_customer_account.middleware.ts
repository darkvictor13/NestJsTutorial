import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { valid } = req.headers;
    if (!valid || valid !== 'true') {
      return res.status(401).send({ error: 'Invalid customer account' });
    }
    next();
  }
}
