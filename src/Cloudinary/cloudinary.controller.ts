/* eslint-disable prettier/prettier */
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/Products/Product.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('file')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('uploadImage/:productId')
  @ApiOperation({
    summary: 'Subir una imagen para un producto',
    description:
      'Este endpoint permite subir una imagen para un producto específico. ' +
      'La imagen debe ser una imagen JPEG, PNG o WebP, y su tamaño no debe exceder los 200 KB.' +
      'Debe ser cargada como un archivo en la solicitud.',
  })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    description: 'Imagen del producto',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // Máximo tamaño de archivo en bytes (200 KB)
            message: 'El archivo es muy grande, el máximo de peso debe ser 200 KB',
          }),
          new FileTypeValidator({
            fileType: /^(image\/jpeg|image\/png|image\/webp)$/, // Tipos de archivo permitidos
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Product> {
    return this.cloudinaryService.uploadImage(productId, file);
  }
}
