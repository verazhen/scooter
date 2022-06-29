import {
  Controller,
  Post,
  Delete,
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
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() scooter: Scooter) {
    return this.adminService.create(scooter);
  }

  @Delete(':id')
  async delete(@Param() params, @Res() res: Response) {
    let { id } = params;
    const result = await this.adminService.delete(id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status_code: HttpStatus.NOT_FOUND,
        message: 'id not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK,
      message: 'delete successfully',
    });
  }
}
