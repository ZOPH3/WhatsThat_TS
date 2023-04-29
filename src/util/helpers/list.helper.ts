import log from "../logger.util";

class ListHelper<T> {

    public add(value: T, arr : Array<T>) : Array<T> {
        log.info(`Adding ${JSON.stringify(value)}, to Array...`);
        return arr.concat(value);
    }

    public remove(value: T, arr : Array<T>) : Array<T> {
        log.info(`Removing ${JSON.stringify(value)}, from Array...`);
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    public update(value : T, ValuesNotUpdated : Array<T>) {
        log.info(`Updating ${JSON.stringify(value)}, in Array...`);
        return this.add(value, ValuesNotUpdated);
    }
}

export default ListHelper;