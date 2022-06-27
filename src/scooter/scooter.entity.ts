import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:7})
  license: string;

}