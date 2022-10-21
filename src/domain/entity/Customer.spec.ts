import Address from './Address';
import Customer from './Customer';

describe('Customer unit tests', () => {
  it('should instanced Customer', () => {
    const customer = new Customer('123', 'asd');
    customer.address = new Address('Rua', 100, '14444-999', 'Cidade');
    customer.activate();

    expect(customer).toHaveProperty('id', '123');
  });

  it('should throw error when id is empty', () => {
    expect(() => new Customer('', 'John')).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrowError('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('1', 'John');

    customer.name = 'Jane';

    expect(customer.name).toEqual('Jane');
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'John');
    const address = new Address('Rua alguma', 100, '14000-000', 'Cidade Alguma');
    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John');
    const address = new Address('Rua alguma', 100, '14000-000', 'Cidade Alguma');
    customer.address = address;

    customer.activate();
    customer.deactivate();

    expect(customer.isActive()).toBeFalsy();
  });

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'John');
      customer.activate();
    }).toThrowError('Required address to activate client');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'John');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});