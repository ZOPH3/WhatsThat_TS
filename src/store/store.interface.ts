export interface IStore<T> {
    load() : Promise<StateReturn<boolean>>;
    reset() : Promise<StateReturn<boolean>>;
    update() : Promise<StateReturn<T>>;
    set(): Promise<StateReturn<T>>;
}