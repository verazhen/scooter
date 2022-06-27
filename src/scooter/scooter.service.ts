import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Scooter } from './interfaces/scooter.interface';
import { Scooter } from './scooter.entity';

@Injectable()
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private scooterRepository: Repository<Scooter>,
  ) {}

  async create(scooter: Scooter): Promise<Scooter> {
    const newScooter = await this.scooterRepository.save(scooter);
    return newScooter;
  }

  async getAll(): Promise<Scooter[]> {
    return this.scooterRepository.find();
  }
}
