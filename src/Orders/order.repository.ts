/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetOrderResponseDTO, OrderDTO, OrderResponseDTO } from './DTOs/Orders.DTO';
import { ProductsRepository } from 'src/Products/products.repository';
import { UsersRepository } from 'src/Users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/Orders/Order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/Products/Product.entity';
import { OrderDetail } from 'src/Orders/OrderDetail.entity';
import { UserDTOResponse } from 'src/Users/DTOs/Users.DTOs';
import { User } from 'src/Users/User.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    private userRepository: UsersRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async AddOrder(order: OrderDTO): Promise<OrderResponseDTO> {
    try {
      const user: User = await this.userRepository.getUserById(
        order.userId,
      );
      const { password, orders, isAdmin, createUser, updateUser, ...extra } = user;
      const products: Product[] = await this.productsRepository.productSelect(
        order.products,
      );
      const orderDetail: OrderDetail = await this.createOrderDetail(products);

      const newOrder: Order = await this.createOrder(extra, orderDetail);
      return {
        newOrder,
      };
    } catch (error) {
      throw error;
    }
  }

  async createOrder(
    user: UserDTOResponse,
    orderDetail: OrderDetail,
  ): Promise<Order> {
    try {
      const newOrder: Order = this.orderRepository.create({
        user,
        date: new Date(),
        orderDetail,
      });
      await this.orderRepository.save(newOrder);
      return newOrder;
    } catch (error) {
      throw error;
    }
  }

  async createOrderDetail(products: Product[]): Promise<OrderDetail> {
    try {
      const price: number = products.reduce(
        (total, suma) => total + parseFloat(suma.price.toString()),
        0
      );

      const newOrderDetail: OrderDetail = this.orderDetailsRepository.create({
        price,
        products,
      });

      await this.orderDetailsRepository.save(newOrderDetail);
      return newOrderDetail;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(id: string): Promise<GetOrderResponseDTO> {
    try {
      const getOrder: Order | null = await this.orderRepository.findOne({
        where: { id },
        relations: ['orderDetail', 'user', 'orderDetail.products'],
      });
      if(!getOrder) throw new NotFoundException("No existe la orden solicitada.")
      
      const order: GetOrderResponseDTO = {
        ...getOrder,
        user: getOrder.user.id,
      } 
      return order;
    } catch (error) {
      throw error;
    }
    
  }
}
