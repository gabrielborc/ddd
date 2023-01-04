import Address from '../../../../../domain/customer/value-object/Address';
import Customer from '../../../../../domain/customer/entity/Customer';

export const factoryCustomer = ({
  customer = new Customer('1', 'Cliente 1'),
  address = new Address('Rua', 1, '00000-000', 'Município'),
  activate = false
} = {}) => {
  customer.address = address;

  if (activate) customer.activate();

  return customer;
}