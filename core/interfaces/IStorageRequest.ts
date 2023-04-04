// Interactions with AsyncStorage
interface IStorageRequest<Type> {
    storeData(valueObject: Type): Promise<boolean>;
    getData(): Promise<Type | null>
    removeData(): void
}

//TODO: What was I even trying to do here?