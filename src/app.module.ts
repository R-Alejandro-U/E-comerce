/* eslint-disable prettier/prettier */
import { SeederDbModule } from './SeederDb/Seeder.module';
import { Module } from '@nestjs/common';
import { AuthsModule } from './Auth/auths.module';
import { CategoriesModule } from './Categories/categories.module';
import { CloudinaryModule } from './Cloudinary/cloudinary.module';
import { ConfigModuleG } from './config.module';
import { JWTModule } from './JWT.module';
import { OrderModule } from './Orders/order.module';
import { ProductModule } from './Products/product.module';
import { UserModule } from './Users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Auth/guard/auth.guard';

@Module({
  imports: [
    ConfigModuleG,
    UserModule,
    ProductModule,
    AuthsModule,
    CategoriesModule,
    OrderModule,
    CloudinaryModule,
    JWTModule,
    SeederDbModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
