import storage from "./storage.wrapper"

export const saveKey = (key: string, data: unknown, expires?: number) => {
    storage.save({
        key: key, // Note: Do not use underscore("_") in key!
        data: data,
        expires: expires
    });
}

// load
export const loadKey = (key: string) => {
    return storage
        .load({
            key: key,

            // autoSync (default: true) means if data is not found or has expired,
            // then invoke the corresponding sync method
            // autoSync: true,

            // syncInBackground (default: true) means if data expired,
            // return the outdated data first while invoking the sync method.
            // If syncInBackground is set to false, and there is expired data,
            // it will wait for the new data and return only after the sync completed.
            // (This, of course, is slower)
            syncInBackground: true,

            // you can pass extra params to the sync method
            // see sync example below
            // syncParams: {
            //     extraFetchOptions: {
            //         // blahblah
            //     },
            //     someFlag: true
            // }
        })
        .then(ret => {
            // found data go to then()
            console.log("Found User ID", ret.userid);
            return ret;
        })
        .catch(err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
}