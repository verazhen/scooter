import {
  Controller,
  Post,
  Delete,
  Body,
  Query,
  Res,
  HttpStatus,
  Param,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() user: User) {
    return this.userService.signUp(user);
  }

  @Get('signin')
  async signIn(@Body() user: User, @Res() res: Response) {
    const sessionId = await this.userService.signIn(user);
    if (!sessionId) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status_code: HttpStatus.FORBIDDEN,
        message: 'log in failed',
      });
    }

    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      session_id: sessionId,
    });
  }


}
