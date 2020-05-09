import {EventEmitter} from 'events';

export default class CommonStore extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100);
  }
}
