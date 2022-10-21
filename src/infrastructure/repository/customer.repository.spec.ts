import { Sequelize } from 'sequelize-typescript'
import Address from '../../domain/entity/Address';
import Customer from '../../domain/entity/Customer';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';
import { factoryCustomer } from './__test__/customer.utils';

describe('Customer repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create and find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = factoryCustomer();

    await customerRepository.create(customer);
    const customerExpect = await customerRepository.find(customer.id);

    expect(customerExpect).toStrictEqual(customer);
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = factoryCustomer();

    await customerRepository.create(customer);

    customer.name = 'Cliente 2';
    customer.address = new Address('Rua 2', 2, '00000-001', 'Cidade');

    await customerRepository.update(customer)
    const customerExpect = await customerRepository.find(customer.id);

    expect(customerExpect).toStrictEqual(customer)
  });

  it('should throw error when not found a customer', async () => {
    const customerRepository = new CustomerRepository();  
    await expect(() => customerRepository.find('unkonw')).rejects.toThrow('Not found customer');
  });

  it('should find all customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = factoryCustomer();
    const customer2 = factoryCustomer({
      customer: new Customer('2', 'Cliente 2')
    });

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toEqual([customer1, customer2]);
  });
});