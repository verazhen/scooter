import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Scooter } from '../scooter/scooter.entity';
import { User } from '../user/user.entity';
import { AdminAuthMiddleware } from '../middleware/adminAuthorization.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter, User])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware).forRoutes('admin');
  }
}
