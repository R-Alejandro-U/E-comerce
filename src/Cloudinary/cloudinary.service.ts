import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { ProductsRepository } from 'src/Products/products.repository';
import { IProductImg } from './product.interface';
import { UploadApiResponse } from 'cloudinary';
import { Product } from 'src/Products/Product.entity';

@Injectable()
export class CloudinaryService {
  constructor(
    private cloudinaryRepository: CloudinaryRepository,
    private productRepository: ProductsRepository,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
    const upload: UploadApiResponse =
      await this.cloudinaryRepository.uploadImage(file);
    const productImg: IProductImg = { imgUrl: upload.secure_url };
    return await this.productRepository.editProduct(id, productImg);
  }
}
