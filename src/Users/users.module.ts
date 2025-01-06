import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { LoggerMw } from 'src/Middleware/Logger.middleware';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/User.entity';

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
