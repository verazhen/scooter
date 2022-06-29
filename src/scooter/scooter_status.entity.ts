import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Scooter } from './scooter.entity';

@Entity()
export class ScooterStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  status: string;
}
