import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Scooter } from '../scooter/scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {
  constructor(private scooterService: AdminService) {} // not sure what to do with
}
