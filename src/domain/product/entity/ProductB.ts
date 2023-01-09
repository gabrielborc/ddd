import ProductInterface from './product.interface';

export default class ProductB implements ProductInterface {
  private _id!: string;
  private _name!: string;
  private _price!: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
  
  get price(): number {
    return this._price * 2;
  }

  set id(id: string) {
    if (!id) throw new Error('Id is required');
    this._id = id;
  }

  set name(name: string) {
    if (!name) throw new Error('Name is required');
    this._name = name;
  }
  
  set price(price: number) {
    if (price <= 0) throw new Error('The price must be greater than zero');
    this._price = price;
  }
}