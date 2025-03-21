import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Redis } from 'ioredis';

@Injectable()
export class OrdersService {
  private redisPub = new Redis();
  private redisSub = new Redis();

  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>) {
    this.redisSub.subscribe('orderProcessed', (err) => {
      if (err) console.error('Redis Subscription Error:', err);
    });

    this.redisSub.on('message', async (_, message) => {
      const updatedOrder = JSON.parse(message);
      await this.orderRepo.update(updatedOrder.id, { status: updatedOrder.status });
    });
  }

  async createOrder(orderData: { product: string; quantity: number }) {
    const order = this.orderRepo.create(orderData);
    await this.orderRepo.save(order);
    this.redisPub.publish('newOrder', JSON.stringify(order));
    return order;
  }
}
