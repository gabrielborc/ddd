import crypto from 'crypto';

import Customer from '../entity/Customer';
import Order from '../entity/Order';
import OrderItem from '../entity/OrderItem';

export default class OrderService {
  static getTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) throw new Error('Order must have at least one item');

    const order = new Order(crypto.randomUUID(), customer.id, items);
    const points = order.total() / 2;

    customer.addRewardPoints(points);

    return order;
  }
}