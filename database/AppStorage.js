import {MongoClient} from "mongodb";
import {mongo_uri} from "../config/Config.js";

export class AppStorage {
    constructor(uri) {

    }

    client = new MongoClient(mongo_uri);
}