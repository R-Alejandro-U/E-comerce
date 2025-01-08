/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  GetOrderResponseDTO,
  OrderDTO,
  OrderResponseDTO,
} from './DTOs/Orders.DTO';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('new-order')
  @ApiOperation({
    summary: 'Crear un nuevo pedido',
    description:
      'Recibe la información del pedido (productos y el id del usuario) y devuelve los datos del pedido creado.',
  })
  @ApiBearerAuth()
  async addOrder(@Body() order: OrderDTO): Promise<OrderResponseDTO> {
    return this.orderService.addOrder(order);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un pedido por ID',
    description:
      'Devuelve la información detallada de un pedido basado en el ID proporcionado. Incluye el id del usuario, productos y detalles de la orden.',
  })
  @ApiBearerAuth()
  async getOrderById(@Param('id') id: string): Promise<GetOrderResponseDTO> {
    return this.orderService.getOrderById(id);
  }
}
