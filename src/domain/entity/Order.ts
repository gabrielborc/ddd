import OrderItem from './OrderItem';

export default class Order {
  _id!: string;
  _customerId!: string;
  _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  set id(id: string) {
    if (!id) throw new Error('Id is required');
    this._id = id;
  }

  set customerId(customerId: string) {
    if (!customerId) throw new Error('CustomerId is required');
    this._customerId = customerId;
  }

  set items(items: OrderItem[]) {
    if (!items.length) throw new Error('Items are required');
    this._items = items;
  }

  total(): number {
    return this.items.reduce((acc, item) => acc + item.total(), 0);
  }
}