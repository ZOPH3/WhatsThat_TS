interface StorageManager<T> {
    save(payload: T): boolean;
    load(): T;
    delete(): boolean;
}

export default StorageManager;