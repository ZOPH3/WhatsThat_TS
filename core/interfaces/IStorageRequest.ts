interface IStorageRequest<Type> {
    storeData(valueObject: Type): Promise<boolean>;
    getData(): Promise<Type | null>
    removeData(): void
}
