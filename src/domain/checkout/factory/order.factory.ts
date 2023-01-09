import { randomUUID } from 'crypto';
import Order from '../entity/Order';
import OrderItem from '../entity/OrderItem';

export type OrderFactoryProps = {
  customerId: string;
  items: [
    {
      name: string;
      productId: string;
      quantity: number;
      price: number;
    }
  ]
};

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => new OrderItem(
      randomUUID(),
      item.name,
      item.price,
      item.productId,
      item.quantity
    ));

    return new Order(randomUUID(), props.customerId, items);
  }
}