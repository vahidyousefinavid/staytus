type State =  any ;
type Listener = (state: State) => void;

class Store {
  private state: State;
  private listeners: Listener[];

  constructor(initialState: State) {
    this.state = initialState;
    this.listeners = [];
  }

  getState(): State {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  setState(newState: State): void {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }
}

export default Store;