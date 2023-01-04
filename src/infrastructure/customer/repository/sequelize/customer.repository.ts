import Address from '../../../../domain/customer/value-object/Address';
import Customer from '../../../../domain/customer/entity/Customer';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customerRepository.interface';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    }, {
      where: {
        id: entity.id
      }
    });
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });
    
    if (!customerModel) throw new Error('Not found customer');

    return this._buildCustomer(customerModel);
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map((customerModel) => (
      this._buildCustomer(customerModel)
    ));
  }

  _buildCustomer(customerModel: CustomerModel): Customer {
    const customer = new Customer(
      customerModel.id,
      customerModel.name
    );

    customer.address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city
    );

    if (customerModel.active) customer.activate();

    return customer;
  }
}