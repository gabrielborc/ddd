export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity!: number;
  
  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this.quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    if (quantity <= 0) throw new Error('The quantity the item must be greater than zero');
    this._quantity = quantity;
  }

  total(): number {
    return this._price * this._quantity;
  }
}