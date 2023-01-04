//Endereço do cliente: {id}, {nome} alterado para: {endereco}
import Customer from '../../../customer/entity/Customer';
import EventHandlerInterface from '../../../@shared/event/eventHandler.interface';
import CustomerChangedAddress from '../../../customer/event/customerChangedAddress.event';

export default class SendConsoleLog2WhenChangedAddress implements EventHandlerInterface<CustomerChangedAddress> {
  handle(event: CustomerChangedAddress): void {
    const customer: Customer = event.eventData;

    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address.toString()}`);
  }
}
