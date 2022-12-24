import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Validate the request
    console.log('Validating customer...');
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ error: 'No authorization provided' });
    }

    if (authorization !== 'I have authorization') {
      return res.status(403).send({ error: 'Wrong authorization' });
    }

    next();
  }
}
