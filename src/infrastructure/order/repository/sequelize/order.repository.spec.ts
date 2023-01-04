import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../../domain/customer/entity/Customer';
import OrderItem from '../../../../domain/checkout/entity/OrderItem';
import Product from '../../../../domain/product/entity/Product';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import OrderModel from './order.model';
import OrderItemModel from './orderItem.model';
import ProductModel from '../../../product/repository/sequelize/product.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import OrderRepository from './order.repository';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import { factoryCustomer } from '../../../customer/repository/sequelize/__test__/customer.utils';
import { factoryOrder } from './__test__/order.utils';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  const buildOrder = async (orderConfig?: any) => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();

    const { customer, order } = factoryOrder(orderConfig);
    const [item1, item2] = order.items;

    const product1 = new Product(item1.productId, item1.name, item1.price);
    const product2 = new Product(item2.productId, item2.name, item2.price);

    await customerRepository.create(customer);
    await productRepository.create(product1);
    await productRepository.create(product2);

    return order;
  }

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a order', async () => {
    const orderRepository = new OrderRepository();
    
    const order = await buildOrder();
    
    await orderRepository.create(order);
    const orderExpect = await orderRepository.find(order.id);

    expect(orderExpect).toStrictEqual(order);
  });

  it('should update a order', async () => {
    const orderRepository = new OrderRepository();
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    
    const order = await buildOrder();
    await orderRepository.create(order);
    
    const customer = factoryCustomer({ customer: new Customer('2', 'Cliente 2') });
    const product1 = new Product('3', 'Produto 3', 100);
    const product2 = new Product('4', 'Produto 4', 250);
    const item1 = new OrderItem('3', product1.name, product1.price, product1.id, 1);
    const item2 = new OrderItem('4', product2.name, product2.price, product2.id, 2);

    order.items = [item1, item2];
    order.customerId = customer.id;

    await customerRepository.create(customer);
    await productRepository.create(product1);
    await productRepository.create(product2);
    await orderRepository.update(order);

    const orderExpect = await orderRepository.find(order.id);

    expect(orderExpect).toStrictEqual(order);
  });

  it('should find a order', async () => {
    const orderRepository = new OrderRepository();
    
    const order = await buildOrder();
    
    await orderRepository.create(order);
    const orderExpect = await orderRepository.find(order.id);

    expect(orderExpect).not.toBeNull();
    expect(orderExpect).toStrictEqual(order);
  });

  it('should find all orders', async () => {
    const orderRepository = new OrderRepository();
    
    const order1 = await buildOrder();
    const order2 = await buildOrder({
      id: '2',
      customer: new Customer('2', 'Cliente 2'),
      items: [
        new OrderItem('3', 'Produto 3', 50, '3', 1),
        new OrderItem('4', 'Produto 4', 100, '4', 2)
      ]
    });

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const ordersExpect = await orderRepository.findAll();

    expect(ordersExpect).toStrictEqual([order1, order2]);
  });
});