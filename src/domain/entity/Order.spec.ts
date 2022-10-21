import OrderItem from "./OrderItem";
import Order from "./Order";

describe('Orders unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Order('', '1', [])).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('o1', '', [])).toThrowError('CustomerId is required');
  });

  it('should throw error when the quantity of items is equal to zero', () => {
    expect(() => new Order('o1', '1', [])).toThrowError('Items are required');
  });

  it('should calculate total', () => {
    const orderItem1 = new OrderItem('i1', 'Item 1', 100, 'p1', 2);
    const orderItem2 = new OrderItem('i2', 'Item 2', 200, 'p2', 2);

    const order1 = new Order('o1', '1', [orderItem1]);
    const order2 = new Order('o2', '1', [orderItem1, orderItem2]);

    expect(order1.total()).toEqual(200);
    expect(order2.total()).toEqual(600);
  });


  it('should throw error when the quantity the item is less or equal to zero', () => {
    expect(() =>
      new OrderItem('i1', 'Item 1', 100, 'p1', 0)
    ).toThrowError('The quantity the item must be greater than zero');
  });
});