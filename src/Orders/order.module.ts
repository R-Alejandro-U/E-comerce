import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/Orders/Order.entity';
import { OrderRepository } from './order.repository';
import { UserModule } from 'src/Users/users.module';
import { ProductModule } from 'src/Products/product.module';
import { OrderDetail } from 'src/Orders/OrderDetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    UserModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
