import EventEmitter from 'events';

type SnackbarStateType = 'success' | 'error';
export type SnackbarState = {
  text: string;
  type: SnackbarStateType;
} | null;

interface SnackbarStoreInterface {
  getState(): SnackbarState;
  getUpdateEvent(): string;
  setState(state: SnackbarState): void;
}

class SnackbarStore extends EventEmitter implements SnackbarStoreInterface {
  private state: SnackbarState = null;
  private updateEvent = 'SNACKBAR_STORE_UPDATED';

  getState(): SnackbarState {
    return this.state;
  }

  getUpdateEvent(): string {
    return this.updateEvent;
  }

  setState(state: SnackbarState): void {
    this.state = state;
    this.emit(this.updateEvent, this.state);
  }
}

export default new SnackbarStore();
