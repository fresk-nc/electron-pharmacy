import CommonStore from './CommonStore';

type SnackbarStateType = 'success' | 'error';

export type SnackbarState = {
  text: string;
  type: SnackbarStateType;
} | null;

interface SnackbarStoreInterface {
  getUpdateEvent(): string;
  getState(): SnackbarState;
  setState(state: SnackbarState): void;
}

/**
 * OOP pattern - Singleton
 */
class SnackbarStore extends CommonStore implements SnackbarStoreInterface {
  private state: SnackbarState = null;
  private updateEvent = 'SNACKBAR_STORE_UPDATED';

  getUpdateEvent(): string {
    return this.updateEvent;
  }

  getState(): SnackbarState {
    return this.state;
  }

  setState(state: SnackbarState): void {
    this.state = state;
    this.emit(this.updateEvent, this.state);
  }
}

export default new SnackbarStore();
