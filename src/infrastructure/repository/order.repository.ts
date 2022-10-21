import Order from '../../domain/entity/Order';
import OrderItem from '../../domain/entity/OrderItem';
import OrderRepositoryInterface from '../../domain/repository/orderRepository.interface';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/orderItem.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
    }, {
      where: {
        id: entity.id
      }
    });

    await OrderItemModel.destroy({
      where: {
        order_id: entity.id
      }
    });

    await OrderItemModel.bulkCreate(
      entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        order_id: entity.id,
        quantity: item.quantity,
      }))
    );
  }

  async find(id: string): Promise<Order | null> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ['items']
    });

    if (!orderModel) return null;

    return this._buildOrder(orderModel);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ['items']
    });

    return orderModels.map(this._buildOrder);
  }

  _buildOrder(orderModel: OrderModel): Order {
    const items = orderModel.items.map((item) => (
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    ));

    return new Order(orderModel.id, orderModel.customer_id, items);
  }
}