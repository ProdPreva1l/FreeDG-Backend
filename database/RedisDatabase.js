import {createClient} from 'redis';
import logger from "../utils/Logger.js";
import {Database} from "./Database.js";

export class RedisDatabase extends Database {
    constructor(dbType, uri) {
        super(dbType, uri);
        this.handleErrors();
        this.connect();
    }
    client = createClient();

    connect() {
        this.client.connect().catch(err=>logger.severe(err));
    }

    handleErrors() {
        this.client.on(`error`, err => logger.severe(err));
    }
}