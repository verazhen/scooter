import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScooterController } from './scooter.controller';
import { ScooterService } from './scooter.service';
import { Scooter } from './scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  controllers: [ScooterController],
  providers: [ScooterService],
})
export class ScooterModule {
  constructor(private scooterService: ScooterService) {} // not sure what to do with
}
