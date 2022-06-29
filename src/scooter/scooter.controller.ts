import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { Scooter } from './scooter.entity';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get()
  async getAll(@Query('x') x, @Query('y') y, @Query('radius') radius) {
    return this.scooterService.getAll(x, y, radius);
  }

  @Post()
  async create(@Body() scooter: Scooter) {
    return this.scooterService.create(scooter);
  }
}
