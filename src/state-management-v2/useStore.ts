import { useEffect, useState } from 'react';
import { store } from './storeProvider';

const useStore = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(setState);
        return () => unsubscribe();
    }, []);

    const updateState = (newState: any) => {
        store.setState(newState);
    };

    return [state, updateState];
};

export default useStore;