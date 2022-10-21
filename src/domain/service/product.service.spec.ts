import Product from '../entity/Product';
import ProductService from './product.service';

describe('Product service unit tests', () => {
  it('should change the prices of all products', () => {
    const products = [
      new Product('product1', 'Product 1', 10),  
      new Product('product2', 'Product 2', 20),  
    ];

    ProductService.increasePrice(products, 100);
    
    expect(products[0].price).toBe(20);
    expect(products[1].price).toBe(40);
  });
});