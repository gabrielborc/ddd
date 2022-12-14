import Customer from '../../../../../domain/customer/entity/Customer';
import Order from '../../../../../domain/checkout/entity/Order';
import OrderItem from '../../../../../domain/checkout/entity/OrderItem';
import { factoryCustomer } from '../../../../customer/repository/sequelize/__test__/customer.utils';

export const factoryOrder = ({
  id = '1',
  customer = undefined,
  items = [
    new OrderItem('1', 'Produto 1', 10, '1', 1),
    new OrderItem('2', 'Produto 2', 25, '2', 2)
  ]
} = {}) => {
  const _customer = factoryCustomer({ customer });
  const order = new Order(id, _customer.id, items);
  
  return { customer: _customer, order };
}