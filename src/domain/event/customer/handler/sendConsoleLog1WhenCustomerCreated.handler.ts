import EventHandlerInterface from '../../@shared/eventHandler.interface';
import CustomerCreatedEvent from '../customerCreated.event';

export default class SendConsoleLog1WhenCustomerCreated implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}