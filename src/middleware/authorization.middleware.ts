import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req.cookies.sessionid);
    const user = await this.getUser(req.cookies.sessionid);
    if (!user) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status_code: HttpStatus.FORBIDDEN,
        message: 'id not found',
      });
    }

    if (user.role.id !== 1) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status_code: HttpStatus.FORBIDDEN,
        message: 'authorization is failed',
      });
    }

    next();
  }

  async getUser(id: number): Promise<User> {
    const [userCheck] = await this.userRepository.find({
      where: [{ id: id }],
      relations: ['role'],
    });

    return userCheck;
  }
}
