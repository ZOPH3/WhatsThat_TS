export interface ICacheManager {
    get(key: string): any;
    set(key: string, value: any): void;
    del(key: string): void;
    flush(): void;
}

interface IStoredData {
    data: {key: string, value: any};
    created: Date;
}