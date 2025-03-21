import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { OrdersService } from './orders.service';
  
  @WebSocketGateway({ cors: true })
  export class OrderGateway {
    @WebSocketServer() server: Server;
  
    constructor(private readonly orderService: OrdersService) {}
  
    @SubscribeMessage('placeOrder')
    async handleOrder(@MessageBody() orderData: { product: string; quantity: number }) {
      const order = await this.orderService.createOrder(orderData);
      this.server.emit('orderUpdated', order);
      return order;
    }
  }
  