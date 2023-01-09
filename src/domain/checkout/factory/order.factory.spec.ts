import { randomUUID } from 'crypto';
import OrderFactory, { OrderFactoryProps } from './order.factory';

describe('Order factory unit test', () => {
  it('should create a order', () => {
    const props: OrderFactoryProps = {
      customerId: randomUUID(),
      items: [
        {
          name: 'Produto 1',
          productId: randomUUID(),
          quantity: 1,
          price: 100
        }
      ]
    }

    const order = OrderFactory.create(props);

    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(props.customerId);
    expect(order.items).toHaveLength(1);
  }); 
});