import Customer from '../../customer/entity/Customer';
import Order from '../entity/Order';
import OrderItem from '../entity/OrderItem';
import OrderService from './order.service';

describe('Order service unit test', () => {

  it('should place an order', () => {
    const customer = new Customer('1', 'Customer 1');
    const orderItem = new OrderItem('oi1', 'item 1', 10, 'p1', 1);

    const order = OrderService.placeOrder(customer, [orderItem]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it('should get total of all orders', () => {
    const orderItem1 = new OrderItem('oi1', 'item 1', 100, 'p1', 1);
    const orderItem2 = new OrderItem('oi2', 'item 2', 200, 'p2', 2);
    
    const order1 = new Order('o1', '1', [orderItem1]);
    const order2 = new Order('o2', '1', [orderItem2]);

    const total = OrderService.getTotal([order1, order2]);

    expect(total).toBe(500);
  });
});