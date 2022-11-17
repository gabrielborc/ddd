import EventHandlerInterface from '../../@shared/eventHandler.interface';
import CustomerCreatedEvent from '../customerCreated.event';

export default class SendConsoleLog2WhenCustomerCreated implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}