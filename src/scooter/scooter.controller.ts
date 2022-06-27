import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { Scooter } from './scooter.entity';

@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get()
  async getAll() {
    return this.scooterService.getAll();
  }

  @Post()
  async create(@Body() scooter: Scooter) {
    return this.scooterService.create(scooter);
  }
}
