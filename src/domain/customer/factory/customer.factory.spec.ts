import CustomerFactory from './customer.factory';

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('Fulano');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Fulano');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const customer = CustomerFactory.createWithAddress('Fulano', 'Rua algo', 999, '99999-999', 'Algo');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Fulano');
    expect(customer.address.street).toBe('Rua algo');
    expect(customer.address.number).toBe(999);
    expect(customer.address.zip).toBe('99999-999');
    expect(customer.address.city).toBe('Algo');
  });
});