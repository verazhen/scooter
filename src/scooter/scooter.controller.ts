import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ScooterService } from './scooter.service';
import { Scooter } from './scooter.entity';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get()
  async getAll(
    @Query('x') x,
    @Query('y') y,
    @Query('radius') radius,
    @Res() res: Response,
  ) {
    if (!x || !y || !radius) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'query is missing',
      });
    }
    //how to deal with input 0
    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      data: await this.scooterService.getAll(x, y, radius),
    });
  }

  @Post()
  async create(@Body() scooter: Scooter) {
    return this.scooterService.create(scooter);
  }
}
