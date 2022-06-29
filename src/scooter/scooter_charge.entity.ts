import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Scooter } from './scooter.entity';

@Entity()
export class ScooterCharge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  charge: string;

}
