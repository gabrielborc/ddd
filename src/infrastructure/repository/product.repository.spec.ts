import { Sequelize } from 'sequelize-typescript'
import Product from '../../domain/entity/Product';
import ProductModel from '../db/sequelize/model/product.model';
import ProductRepository from './product.repository';

describe('Product repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    const productExpect = await productRepository.find(product.id);

    expect(productExpect).toStrictEqual(product); 
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    
    product.name = 'Product other';
    product.price = 200;
    
    await productRepository.update(product)
    const productExpect = await productRepository.find(product.id);

    expect(productExpect).toStrictEqual(product);
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    const productNotExist = await productRepository.find('0');
    const productExpect = await productRepository.find(product.id);

    expect(productNotExist).toBeNull();
    expect(productExpect).toStrictEqual(product);
  });


  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = await productRepository.findAll();

    expect(products).toEqual([product1, product2]);
  });
});