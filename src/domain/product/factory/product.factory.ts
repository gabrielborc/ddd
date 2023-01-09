import { randomUUID } from 'crypto';
import Product from '../entity/Product';
import ProductInterface from '../entity/product.interface';
import ProductB from '../entity/ProductB';

export default class ProductFactory {
  public static create(
    type: string,
    name: string, 
    price: number
  ): ProductInterface {
    if (type === 'a') {
      return new Product(randomUUID(), name, price);
    } else if (type === 'b') {
      return new ProductB(randomUUID(), name, price);
    }

    throw new Error('Product type not support');
  }
}