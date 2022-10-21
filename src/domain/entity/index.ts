import Customer from './Customer';
import Address from './Address';
import OrderItem from './OrderItem';
import Order from './Order';

const customer = new Customer('123', 'asd');
customer.address = new Address('Rua', 100, '14444-999', 'Cidade');
customer.activate();

const item1 = new OrderItem('1', 'item 1', 10, 'p1', 1);
const item2 = new OrderItem('1', 'item 1', 12.5, 'p2', 1);
const order = new Order('1', customer.id, [item1, item2]);

console.log(order);