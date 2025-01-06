/* eslint-disable prettier/prettier */

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerMwGlobal } from "./Middleware/logger.middleware";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { Product } from "./Products/Product.entity";
import { User } from "./Users/User.entity";
import { Order } from "./Orders/Order.entity";
import { OrderDetail } from "./Orders/OrderDetail.entity";
import { Category } from "./Categories/Category.entity";
import { PORT } from "./config/envs";
import 'dotenv/config';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.use(LoggerMwGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const swaggerConfig: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
  .setTitle("M4-E-Comerce(R-Alejandro-U)")
  .setDescription(`Este proyecto forma parte del Módulo 4 de mis estudios en Henry, como parte de mi especialización en back-end. Consiste en un servidor básico para un e-commerce que permite agregar, editar y eliminar productos y usuarios, además de crear órdenes de compra y subir imágenes a la nube mediante Cloudinary. Las rutas están protegidas mediante roles y autenticación con JWT (JSON Web Token).
    
  Importante, ya que un usuario no se puede dar a si mismo el rol de administrador, para esto deberas usar el usuario que se precarga como administrador, solo un usurio con el rol de admin puede dar rol se administrador.
  
  password: "Main123."
  email: "main@gmail.com"
  
  Con este usuario podras dar o quitar el rol de administrador, más no podras quitraselo a este.`)
  .setVersion("0.0.1")
  .addBearerAuth()
  .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig, {extraModels: [Product, User, Order, OrderDetail, Category]});
  SwaggerModule.setup("e-comerce", app, document);
  
    const port = process.env.PORT

  await app.listen(port, () =>
    console.log(`Server is listening on port ${PORT}`),
  );
  
}

bootstrap();
