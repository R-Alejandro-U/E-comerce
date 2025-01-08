/* eslint-disable prettier/prettier */
import { Product } from 'src/Products/Product.entity';
import { DataPage } from 'src/Users/DTOs/Users.DTOs';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsUrl,
  IsPositive,
  MinLength,
  MaxLength,
  Max,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/Categories/Category.entity';

class ProductDTO {
  @ApiProperty({
    description:
      'Debe contener un nombre, con un mínimo de 3 caracteres y un máximo de 100.',
    example: 'Camisa Praga',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, {
    message: 'El nombre del producto debe tener al menos 3 caracteres.',
  })
  @MaxLength(100, {
    message: 'El nombre del producto no debe exceder los 100 caracteres.',
  })
  @IsNotEmpty({ message: 'El campo nombre no debe estar vacío.' })
  name: string;

  @ApiProperty({
    description:
      'Debe contener una descripción detallada, con un mínimo de 5 caracteres y un máximo de 500.',
    example: 'Camiseta con diseño exclusivo y materiales de alta calidad.',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MinLength(5, { message: 'La descripción debe tener al menos 5 caracteres.' })
  @MaxLength(500, {
    message: 'La descripción no debe exceder los 500 caracteres.',
  })
  @IsNotEmpty({ message: 'El campo descripción no debe estar vacío.' })
  description: string;

  @ApiProperty({
    description:
      'Debe ser un número positivo, mayor a 0 y menor o igual a 999,999,999.',
    example: 49.99,
  })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser un valor positivo.' })
  @Min(0.01, { message: 'El precio debe ser mayor a 0.' })
  @Max(999999999, {
    message:
      'Nadie va comprar esto ¿es en serio? baja el precio el máximo es de 999999999, y aun poniendo el máximo nadie lo va a comprar.',
  })
  @IsNotEmpty({ message: 'El campo precio no debe estar vacío.' })
  price: number;

  @ApiProperty({
    description:
      'Debe ser un número positivo, con un mínimo de 0 (no negativo).',
    example: 150,
  })
  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @IsPositive({ message: 'El stock debe ser un valor positivo.' })
  @Min(0, { message: 'El stock no puede ser negativo.' })
  @IsNotEmpty({ message: 'El campo stock no debe estar vacío.' })
  stock: number;

  @ApiProperty({
    description:
      'Debe ser una URL válida para la imagen del producto, en el caso que no se porporcione, tendra una por defecto.',
    example:
      'https://http2.mlstatic.com/D_NQ_NP_976889-MLA77766301521_072024-O.webp',
    default:
      'https://plus.unsplash.com/premium_photo-1733317483746-661d5384329c?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida.' })
  @IsNotEmpty({ message: 'El campo URL de la imagen no debe estar vacío.' })
  imgUrl: string;

  @ApiProperty({
    description:
      'Debe ser una cadena de texto, con un mínimo de 3 caracteres y un máximo de 50.',
    example: 'Ropa',
  })
  @IsString({ message: 'La categoría debe ser una cadena de texto.' })
  @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'La categoría no debe exceder los 50 caracteres.' })
  @IsNotEmpty({ message: 'El campo categoría no debe estar vacío.' })
  category: string;
}

class ProductDTOResponse {
  @ApiProperty({ description: 'Información de la paginación.', type: DataPage })
  dataPage: DataPage;
  @ApiProperty({ description: 'Lista de productos.', type: [Product] })
  products: Product[];
}

class ProductUpdateDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres.' })
  @ApiProperty({
    description: 'Nombre del producto. Debe tener un máximo de 50 caracteres.',
    example: 'Camiseta Negra',
  })
  name?: string;

  @ValidateIf((obj) => obj.description !== undefined)
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @ApiProperty({
    description: 'Descripción detallada del producto.',
    example: 'Camiseta negra de algodón 100% con diseño minimalista.',
  })
  description?: string;

  @ValidateIf((obj) => obj.price !== undefined)
  @IsNumber({}, { message: 'El precio debe ser un número válido.' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0.' })
  @ApiProperty({
    description: 'Precio del producto. Debe ser un número mayor o igual a 0.',
    example: 19.99,
  })
  price?: number;

  @ValidateIf((obj) => obj.stock !== undefined)
  @IsNumber({}, { message: 'El stock debe ser un número entero válido.' })
  @Min(0, { message: 'El stock debe ser mayor o igual a 0.' })
  @ApiProperty({
    description:
      'Cantidad de unidades disponibles en stock. Debe ser mayor o igual a 0.',
    example: 150,
  })
  stock?: number;

  @ValidateIf((obj) => obj.imgUrl !== undefined)
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida.' })
  @ApiProperty({
    description:
      'URL de la imagen del producto. Si no se especifica, se utilizará una imagen predeterminada.',
    example:
      'https://plus.unsplash.com/premium_photo-1733317483746-661d5384329c?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    default:
      'https://plus.unsplash.com/premium_photo-1733317483746-661d5384329c?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  imgUrl?: string;

  @ValidateIf((obj) => obj.category !== undefined)
  @IsString({ message: 'La categoría debe ser una referencia válida.' })
  @ApiProperty({
    description:
      'Categoría asociada al producto. Debe ser el identificador único de la categoría.',
    example: 'Ropa',
  })
  category?: string;
}

export { ProductDTO, ProductDTOResponse, ProductUpdateDto };
