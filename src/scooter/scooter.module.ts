import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScooterController } from './scooter.controller';
import { ScooterService } from './scooter.service';
import { Scooter } from './scooter.entity';
import { User } from '../user/user.entity';
import { UserAuthMiddleware } from '../middleware/authorization.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter, User])],
  controllers: [ScooterController],
  providers: [ScooterService],
})
export class ScooterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes('scooter');
  }
}
