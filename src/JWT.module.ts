import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_WORD } from './config/envs';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: SECRET_WORD,
    }),
  ],
})
export class JWTModule {}
