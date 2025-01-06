import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDTO, ProductUpdateDto } from './DTOs/ProductDTO';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Products/Product.entity';
import { Category } from 'src/Categories/Category.entity'; 
import { ProductIdDTO } from 'src/Orders/DTOs/Orders.DTO';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product: Product | null = await this.productRepository.findOne({
        where: { id },
        relations: ['category'],
      });
      if (!product) throw new BadRequestException(`No existe el producto`);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<string> {
    try {
      this.productRepository.delete({ id });
      return id;
    } catch (error) {
      throw error;
    }
  }

  async registerProduct(data: ProductDTO): Promise<string> {
    try {
      const category: Category | null = await this.CategoryRepository.findOneBy(
        { name: data.category },
      );
      if (!category)
        throw new BadRequestException(
          `no existe la categoría ${data.category}`,
        );
      const newProduct: Product = this.productRepository.create({
        ...data,
        category,
      });
      await this.productRepository.save(newProduct);
      return newProduct.id;
    } catch (error) {
      throw error;
    }
  }

  async editProduct(id: string, product: ProductUpdateDto): Promise<Product> {
    try {
      const oldProduct: Product = await this.getProductById(id);
      const updateProduct: Product = {
        ...oldProduct,
        ...product,
      };
      await this.productRepository.save(updateProduct);
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }

  async  productSelect(productId: ProductIdDTO[]): Promise<Product[]> {
    try {
      const products: (null | Product)[] = await Promise.all(
        Array.from(new Set(productId)).map(async (id) => {
          const product: Product | null =
            await this.productRepository.findOneBy({ id: id.id });

          if (!product || product.stock === 0) return null;
          else {
            product.stock -= 1;
            await this.productRepository.save(product);
            return product;
          }
        }),
      );

      if (products.every((product) => product == null))
        throw new BadRequestException(
          `No se pudo, agregar ni un solo producto a la orden.`,
        );

      return products.filter((product): product is Product => product !== null);
    } catch (error) {
      throw error;
    }
  }
}
