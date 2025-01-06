import { Module } from '@nestjs/common';
import { UserModule } from './Users/users.module';
import { ProductModule } from './Products/product.module';
import { AuthsModule } from './Auth/auths.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Auth/guard/auth.guard';
import { ConfigModuleG } from './config.module';
import { CategoriesModule } from './Categories/categories.module';
import { SeederModule } from './seeder/seeder.module';
import { OrderModule } from './Orders/order.module';
import { CloudinaryModule } from './Cloudinary/cloudinary.module';
import { JWTModule } from './JWT.module';

@Module({
  imports: [
    ConfigModuleG,
    UserModule,
    ProductModule,
    AuthsModule,
    CategoriesModule,
    SeederModule,
    OrderModule,
    CloudinaryModule,
    JWTModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
