/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthsModule } from "./Auth/auths.module";
import { CategoriesModule } from "./Categories/categories.module";
import { CloudinaryModule } from "./Cloudinary/cloudinary.module";
import { ConfigModuleG } from "./config.module";
import { JWTModule } from "./JWT.module";
import { OrderModule } from "./Orders/order.module";
import { ProductModule } from "./Products/product.module";
import { SeederModule } from "./Seeder/Seeder.module";
import { UserModule } from "./Users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./Auth/guard/auth.guard";


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
