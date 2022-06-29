import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Query,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { ScooterService } from './scooter.service';
import { Scooter } from './scooter.entity';
import { ScooterStatus } from './scooter_status.entity';
import { ScooterCharge } from './scooter_charge.entity';

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

  @Patch(':id')
  async update(@Param() params, @Body() scooter: Scooter) {
    let { id } = params;
    id = Number(id);
    const { battery, mileage, latitude, longitude, status_id, charge_id } =
      scooter;
    const scooterUpdate: {
      id: number;
      battery: number;
      mileage: number;
      latitude: number;
      longitude: number;
      status_id: ScooterStatus;
      charge_id: ScooterCharge;
    } = { id, battery, mileage, latitude, longitude, status_id, charge_id };

    return this.scooterService.update(scooterUpdate);
  }
}
