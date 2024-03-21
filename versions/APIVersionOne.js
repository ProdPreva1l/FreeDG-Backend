import {BaseAPIVersion} from "./BaseAPIVersion.js";
import {RedisDatabase} from "../database/RedisDatabase.js";

export class APIVersionOne extends BaseAPIVersion {
    constructor() {
        super();
    }

    getRedis(uri) {
        return new RedisDatabase(uri);
    }

    getMongo(uri) {
        return null;
    }
}