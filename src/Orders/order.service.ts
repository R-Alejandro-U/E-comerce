/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  GetOrderResponseDTO,
  OrderDTO,
  OrderResponseDTO,
} from './DTOs/Orders.DTO';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}
  async addOrder(order: OrderDTO): Promise<OrderResponseDTO> {
    return await this.orderRepository.AddOrder(order);
  }
  async getOrderById(id: string): Promise<GetOrderResponseDTO> {
    return await this.orderRepository.getOrderById(id);
  }
}
