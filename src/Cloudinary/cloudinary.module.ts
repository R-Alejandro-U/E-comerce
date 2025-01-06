import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryConfig } from 'src/config/claudinary.config';
import { CloudinaryRepository } from './cloudinary.repository';
import { ProductModule } from 'src/Products/product.module';

@Module({
  imports: [ProductModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig, CloudinaryRepository],
})
export class CloudinaryModule {}
