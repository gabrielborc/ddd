import { randomUUID } from 'crypto';
import Customer from '../entity/Customer';
import Address from '../value-object/Address';

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(randomUUID(), name);
  } 

  public static createWithAddress(
    name: string,
    street: string,
    number: number,
    zip: string,
    city: string
  ): Customer {
    const address = new Address(street, number, zip, city);
    const customer = new Customer(randomUUID(), name);
    customer.address = address;

    return customer;
  }
}