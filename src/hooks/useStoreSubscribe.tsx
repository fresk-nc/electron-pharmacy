import {useEffect} from 'react';

export default function useStoreSubscribe(store: any, handler: any) {
  useEffect(() => {
    store.on(store.getUpdateEvent(), handler);

    return () => {
      store.off(store.getUpdateEvent(), handler);
    };
  });
}
