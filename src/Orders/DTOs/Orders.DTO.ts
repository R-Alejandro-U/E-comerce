/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UserOrderDTO } from 'src/Users/DTOs/Users.DTOs';
import { OrderDetail } from '../OrderDetail.entity';

export class ProductIdDTO {
  @ApiProperty({
    description: 'El ID del producto debe ser un UUID válido.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'El ID del producto debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del producto no debe estar vacío.' })
  id: string;
}

export class OrderDTO {
  @ApiProperty({
    description: 'El userId debe ser un UUID válido que identifica al usuario.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El userId no debe estar vacío.' })
  userId: string;

  @ApiProperty({
    description:
      'Debe ser un arreglo que contenga al menos un producto con su ID.',
    example: [
      { id: '550e8400-e29b-41d4-a716-446655440000' },
      { id: '123e4567-e89b-12d3-a456-426614174000' },
    ],
  })
  @IsArray({ message: 'Products debe ser un arreglo.' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto.' })
  @ValidateNested({
    each: true,
    message: 'Cada producto debe ser un objeto con los campos requeridos.',
  })
  @Type(() => ProductIdDTO)
  products: ProductIdDTO[];
}

class NewOrder {
  @ApiProperty({
    description: 'Identificador único del pedido en formato UUID',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Fecha y hora en que se realizó el pedido',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    type: UserOrderDTO,
    description: 'Información del usuario que realizó el pedido',
  })
  user: UserOrderDTO;

  @ApiProperty({
    type: OrderDetail,
    description: 'Detalles del pedido, incluyendo productos, precios y más',
  })
  orderDetail: OrderDetail;
}

export class OrderResponseDTO {
  @ApiProperty({ type: NewOrder, description: 'Nueva orden.' })
  newOrder: NewOrder;
}

export class GetOrderResponseDTO {
  @ApiProperty({
    description: 'Identificador único del pedido en formato UUID',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Fecha y hora en que se realizó el pedido',
  })
  @IsDate()
  date: Date;

  @IsUUID()
  @ApiProperty({
    description: 'UUID del usuario que realizó el pedido',
    example: 'eefdd1fd-dffa-4cef-aedb-80e150f6b8ae',
  })
  user: string;

  @ApiProperty({
    type: OrderDetail,
    description: 'Detalles del pedido, incluyendo productos, precios y más',
  })
  orderDetail: OrderDetail;
}
