import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as Redis from 'ioredis';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private redis = new Redis();
  // tslint:disable-next-line:ban-types
  async use(req: Request, res: Response, next: Function) {
    const token = await this.redis.get(req.headers.authorization);
    if (token) {
        next();
    } else {
        throw new HttpException(`autentification faild`, HttpStatus.UNAUTHORIZED);
    }
  }
}
