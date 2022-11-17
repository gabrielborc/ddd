import Address from '../../entity/Address';
import Customer from '../../entity/Customer';
import EventDispatcher from '../@shared/eventDispatcher';
import CustomerChangedAddress from './customerChangedAddress.event';
import CustomerCreatedEvent from './customerCreated.event';
import SendConsoleLog1WhenCustomerCreated from './handler/sendConsoleLog1WhenCustomerCreated.handler';
import SendConsoleLog2WhenCustomerCreated from './handler/sendConsoleLog2WhenCustomerCreated.handler';
import SendConsoleLog2WhenChangedAddress from './handler/sendConsoleLogWhenChangedAddress.handler';

describe('Customer events tests', () => {
  it('should notify event when customer created', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1WhenCustomerCreated();
    const eventHandler2 = new SendConsoleLog2WhenCustomerCreated();
    const spyConsoleLog = jest.spyOn(console, 'log');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toEqual([eventHandler1, eventHandler2]);

    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyConsoleLog).toHaveBeenCalledTimes(2);
  });

  it('should notify event when customer changed address', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog2WhenChangedAddress();
    const spyConsoleLog = jest.spyOn(console, 'log');

    eventDispatcher.register('CustomerChangedAddress', eventHandler);

    expect(eventDispatcher.getEventHandlers['CustomerChangedAddress'][0]).toEqual(eventHandler)

    const customer = new Customer('1', 'Fulano')
    customer.address = new Address('Rua', 1, '99999-999', 'Cidade')

    const customerChangedAddress = new CustomerChangedAddress(customer);

    eventDispatcher.notify(customerChangedAddress);
    
    expect(spyConsoleLog).toHaveBeenCalled();
  });
});