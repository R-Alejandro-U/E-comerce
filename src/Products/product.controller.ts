/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ProductDTO,
  ProductDTOResponse,
  ProductUpdateDto,
} from './DTOs/ProductDTO';
import { Product } from 'src/Products/Product.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/utils/Roles.enum';
import { RolesGuard } from 'src/Auth/guard/roles.guard';
import { IdDTO } from 'src/utils/GlobalDTO/Global.DTO';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @SetMetadata('isPublic', true)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Obtener todos los productos',
    description:
      'Este endpoint permite obtener todos los productos con paginación. El número de página y el límite de productos por página pueden ser configurados mediante parámetros de consulta.',
  })
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<ProductDTOResponse> {
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(limit) || limit <= 0) limit = 5;
    return this.productService.getAllProducts(page, limit);
  }

  @Get(':id')
  @SetMetadata('isPublic', true)
  @ApiOperation({
    summary: 'Obtener producto por ID',
    description:
      'Este endpoint permite obtener los detalles de un producto específico utilizando su ID. El ID debe ser un UUID válido.',
  })
  async getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post('new-product')
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description:
      'Este endpoint permite crear un nuevo producto. El cuerpo de la solicitud debe contener los detalles del nuevo producto a crear.',
  })
  @ApiResponse({ type: IdDTO })
  @ApiBearerAuth()
  async createProduct(@Body() data: ProductDTO): Promise<string> {
    return this.productService.createProduct(data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar producto por ID',
    description:
      'Este endpoint permite eliminar un producto específico utilizando su ID. El ID debe ser un UUID válido.',
  })
  @ApiResponse({ type: IdDTO })
  @ApiBearerAuth()
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Editar producto por ID',
    description:
      'Este endpoint permite editar los detalles de un producto específico utilizando su ID. El ID debe ser un UUID válido y el cuerpo de la solicitud debe contener los datos actualizados del producto.',
  })
  @ApiBearerAuth()
  async editProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.editProduct(id, product);
  }
}
