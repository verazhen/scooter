import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Scooter } from './scooter.entity';
import { ScooterStatus } from './scooter_status.entity';
import { ScooterCharge } from './scooter_charge.entity';

function getDistance(loc1: [number, number], loc2: [number, number]): number {
  return Math.sqrt(
    Math.pow(loc1[0] - loc2[0], 2) + Math.pow(loc1[1] - loc2[1], 2),
  );
}

@Injectable() //make sure the service can be injected in the controller
export class ScooterService {
  constructor(
    @InjectRepository(Scooter)
    private scooterRepository: Repository<Scooter>,
  ) {}

  async getAll(x: number, y: number, radius: number): Promise<Scooter[]> {
    const scooters = await this.scooterRepository.find({
      select: ['id', 'latitude', 'longitude'],
      where: [
        {
          latitude: Between(x - radius, x + radius),
          longitude: Between(y - radius, y + radius),
        },
      ],
    });
    return scooters.filter((scooter) => {
      const distance = getDistance(
        [scooter.latitude, scooter.longitude],
        [x, y],
      );
      return distance <= radius;
    });
  }

  async getOne(id: number): Promise<Scooter> {
    const [scooter] = await this.scooterRepository.find({ where: [{ id }] });
    return scooter;
  }

  async update(scooter: {
    id: number;
    battery: number;
    mileage: number;
    latitude: number;
    longitude: number;
    status_id: ScooterStatus;
    charge_id: ScooterCharge;
  }): Promise<Scooter> {
    const updateScooter = await this.scooterRepository.save(scooter);
    return updateScooter;
  }
}
