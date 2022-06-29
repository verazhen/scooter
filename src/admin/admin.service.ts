import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Scooter } from '../scooter/scooter.entity';
import { ScooterStatus } from '../scooter/scooter_status.entity';
import { ScooterCharge } from '../scooter/scooter_charge.entity';

@Injectable() //make sure the service can be injected in the controller
export class AdminService {
  constructor(
    @InjectRepository(Scooter)
    private scooterRepository: Repository<Scooter>,
  ) {}

  async create(scooter: Scooter): Promise<Scooter> {
    const newScooter = await this.scooterRepository.save(scooter);
    return newScooter;
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.scooterRepository.delete({ id });

    return affected ? true : false;
  }
}
