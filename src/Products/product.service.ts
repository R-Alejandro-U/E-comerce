/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import {
  ProductDTO,
  ProductDTOResponse,
  ProductUpdateDto,
} from './DTOs/ProductDTO';
import { Product } from 'src/Products/Product.entity';

@Injectable()
export class ProductService {
  constructor(private productsRepository: ProductsRepository) {}
  async getAllProducts(
    page: number,
    limit: number,
  ): Promise<ProductDTOResponse> {
    const products: Product[] = await this.productsRepository.getProducts();
    const totalItems: number = products.length;
    const maxPages: number = Math.ceil(totalItems / limit);
    const currentPage: number = Math.min(Math.max(1, page), maxPages);
    const init: number = (currentPage - 1) * limit;
    const end: number = Math.min(currentPage * limit, totalItems);

    const Products: Product[] = products.slice(init, end);
    return {
      dataPage: {
        totalItems,
        maxPages,
        page: currentPage,
        currentItems: products.length,
      },
      products: Products,
    };
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productsRepository.getProductById(id);
  }

  async createProduct(data: ProductDTO): Promise<string> {
    return await this.productsRepository.registerProduct(data);
  }

  async deleteProduct(id: string): Promise<string> {
    const productId = await this.productsRepository.getProductById(id);
    return await this.productsRepository.deleteProduct(productId.id);
  }

  async editProduct(id: string, product: ProductUpdateDto): Promise<Product> {
    return await this.productsRepository.editProduct(id, product);
  }
}
