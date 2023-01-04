import Customer from '../../customer/entity/Customer';
import EventInterface from '../../@shared/event/event.interface';


export default class CustomerChangedAddress implements EventInterface {
  dataTimeOccured: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}