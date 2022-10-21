import Product from './Product';

describe('Orders unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Product('', 'ps5', 1)).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Product('p1', '', 1)).toThrowError('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => new Product('p1', 'ps5', 0)).toThrowError('The price must be greater than zero');
  });

  it('should change name', () => {
    const product = new Product('p1', 'ps5', 1);
    product.name = 'ps5 pro';

    expect(product.name).toEqual('ps5 pro');
  });

  it('should change name', () => {
    const product = new Product('p1', 'ps5', 1);
    product.price = 3500;

    expect(product.price).toEqual(3500);
  });
});