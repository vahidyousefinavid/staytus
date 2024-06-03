"use client"

import React, { useEffect, useState, ReactNode } from 'react';
import Store from './store';

interface StoreProviderProps {
  children: ReactNode;
}

const store = new Store({ count: 0 });

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(setState);
    return () => unsubscribe();
  }, []);

  // Override store's setState method to ensure React state updates
  const originalSetState = store.setState.bind(store);
  store.setState = (newState) => {
    originalSetState(newState);
    setState(store.getState());
  };

  return <>{children}</>;
};

export { StoreProvider, store };