//Endereço do cliente: {id}, {nome} alterado para: {endereco}
import Customer from '../../../entity/Customer';
import EventHandlerInterface from '../../@shared/eventHandler.interface';
import CustomerChangedAddress from '../customerChangedAddress.event';

export default class SendConsoleLog2WhenChangedAddress implements EventHandlerInterface<CustomerChangedAddress> {
  handle(event: CustomerChangedAddress): void {
    const customer: Customer = event.eventData;

    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address.toString()}`);
  }
}
