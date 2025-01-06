import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/Products/Product.entity';
import { Category } from 'src/Categories/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductService, ProductsRepository],
  controllers: [ProductController],
  exports: [ProductsRepository],
})
export class ProductModule {}
