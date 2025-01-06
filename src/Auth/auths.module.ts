import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { ValidateCredential } from 'src/Middleware/ValidateCredential.middleware';
import { UserModule } from 'src/Users/users.module';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService],
  imports: [UserModule],
})
export class AuthsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateCredential).forRoutes('auth/signin');
  }
}
