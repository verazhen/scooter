import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScooterModule } from './scooter/scooter.module';
import { Scooter } from './scooter/scooter.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'scooter',
      entities: [Scooter],
      synchronize: true,
    }),
    ScooterModule,
  ],
})
export class AppModule {}
