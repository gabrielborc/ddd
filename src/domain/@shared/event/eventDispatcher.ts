import eventInterface from './event.interface';
import EventDispatcherInterface from './eventDispatcher.interface';
import EventHandlerInterface from './eventHandler.interface';
import eventHandlerInterface from './eventHandler.interface';

type eventHandlersType = { [eventName: string]: EventHandlerInterface[] };

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: eventHandlersType = {};

  get getEventHandlers(): eventHandlersType {
    return this.eventHandlers;
  }
  
  notify(event: eventInterface): void {
    const eventName = event.constructor.name;
    const eventHandlers = this.eventHandlers[eventName];

    if (eventHandlers) {
      eventHandlers.forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }
  
  register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }
  
  unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = this.eventHandlers[eventName]
        .filter((_eventHandler) => eventHandler !== _eventHandler); 
    }
  }
  
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}