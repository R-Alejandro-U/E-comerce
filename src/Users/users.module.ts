import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserController } from './users.controller';
import { User } from './User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMw } from 'src/Middleware/logger.middleware';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMw).forRoutes('users');
  }
}
