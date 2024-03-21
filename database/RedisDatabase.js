import {createClient} from 'redis';
import logger from "../utils/Logger.js";
import {BaseDatabase} from "./BaseDatabase.js";

export class RedisDatabase extends BaseDatabase {
    #uri;
    constructor(uri) {
        super(uri);
        this.#handleErrors();
        this.#uri = uri;
    }
    client = createClient({url: this.#uri});

    connect() {
        this.client.connect().catch(err=>logger.severe(err));
    }

    getDatabases() {
        return {"test": "data"};
    }

    close() {
        this.client.quit().catch(err=>logger.severe(err))
    }

    #handleErrors() {
        this.client.on(`error`, err => logger.severe(err));
    }
}