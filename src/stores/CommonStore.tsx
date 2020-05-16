import {EventEmitter} from 'events';

export interface CommonStoreInterface<T> extends NodeJS.EventEmitter {
  getUpdateEvent(): string;
  getState(): T;
  setState(state: T): void;
}

export default abstract class CommonStore<T> extends EventEmitter
  implements CommonStoreInterface<T> {
  protected abstract state: T;
  protected abstract updateEvent: string;

  constructor() {
    super();

    this.setMaxListeners(100);
  }

  getUpdateEvent(): string {
    return this.updateEvent;
  }

  getState(): T {
    return this.state;
  }

  setState(state: T): void {
    this.state = state;
  }
}
