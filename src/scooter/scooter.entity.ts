import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ScooterStatus } from './scooter_status.entity';
import { ScooterCharge } from './scooter_charge.entity';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 7, unique: true })
  license: string;

  @Column({ type: 'smallint' })
  battery: number;

  @Column({ type: 'smallint' })
  mileage: number;

  @Index()
  @Column({ type: 'smallint' })
  latitude: number;

  @Index()
  @Column({ type: 'smallint' })
  longitude: number;

  @ManyToOne(() => ScooterStatus, (status) => status.id)
  status_id: ScooterStatus;

  @ManyToOne(() => ScooterStatus, (charge) => charge.id)
  charge_id: ScooterCharge;

  @CreateDateColumn()
  manufature_dt: Date;

  @Column({ type: 'datetime' })
  register_dt: Date;

  @UpdateDateColumn()
  update_dt: Date;
}
