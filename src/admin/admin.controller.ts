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
import { AdminService } from './admin.service';
import { Scooter } from '../scooter/scooter.entity';
import { ScooterStatus } from '../scooter/scooter_status.entity';
import { ScooterCharge } from '../scooter/scooter_charge.entity';

@Controller('admin/scooter')
export class AdminController {
  constructor(private readonly scooterService: AdminService) {}

  @Post()
  async create(@Body() scooter: Scooter) {
    return this.scooterService.create(scooter);
  }
}
