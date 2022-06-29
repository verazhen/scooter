import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
  Param,
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
    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      data: await this.scooterService.getAll(x, y, radius),
    });
  }

  @Get(':id')
  async getOne(@Param() params, @Res() res: Response) {
    const { id } = params;

    const scooter = await this.scooterService.getOne(id);
    if (!scooter) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status_code: HttpStatus.NOT_FOUND,
        message: 'id not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      data: scooter,
    });
  }

  @Post()
  async create(@Body() scooter: Scooter) {
    return this.scooterService.create(scooter);
  }
}
