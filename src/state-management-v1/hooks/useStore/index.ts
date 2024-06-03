import { useMemo, useState } from "react"

class EventEmitter extends EventTarget {
    emit(key: any) {
        this.dispatchEvent(new Event(key))
    }
}


const createStore = (initialState: any = {}) => {
    const instance = new EventEmitter()

    return (key: any) => {
        const [, setCount] = useState(0)

        useMemo(() => {
            instance.addEventListener(key, () => {
                setCount((c) => (c + 1) % Number.MAX_SAFE_INTEGER)
            })
        }, [key])

        return [
            initialState[key],
            (cb: any) => {
                initialState[key] = cb(initialState[key]);
                instance.emit(key)
            }
        ]
    }
}

export {
    createStore,
}