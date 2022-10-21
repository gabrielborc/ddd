import Product from '../entity/Product';

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      product.price += product.price * (percentage / 100);
    });
  }
}