export interface ICacheManager {
    get(key: string): any;
    set(key: string, value: any): void;
    del(key: string): void;
    flush(): void;
}

export interface IStorageManager<T> {
    save(payload: T): boolean;
    load(): T;
    delete(): boolean;
}

interface IStoredData {
    data: {key: string, value: any};
    created: Date;
}