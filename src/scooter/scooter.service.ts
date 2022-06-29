import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Scooter } from './scooter.entity';

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

  async create(scooter: Scooter): Promise<Scooter> {
    const newScooter = await this.scooterRepository.save(scooter);
    return newScooter;
  }

  async getAll(x: number, y: number, radius: number): Promise<Scooter[]> {
    const scooters = await this.scooterRepository.find({
      select: ['id', 'latitude', 'longtitude'],
      where: [
        {
          latitude: Between(x - radius, x + radius),
          longtitude: Between(y - radius, y + radius),
        },
      ],
    });
    return scooters.filter((scooter) => {
      const distance = getDistance(
        [scooter.latitude, scooter.longtitude],
        [x, y],
      );
      return distance <= radius;
    });
  }
}
