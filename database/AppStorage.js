import {MongoClient} from "mongodb";
import {mongo_uri} from "../config/Config.js";
import logger from "../utils/Logger.js";

const client = new MongoClient(mongo_uri);

async function initiate() {
    try {
        await client.connect();
        await client.db("admin").command({ping:1});
        logger.info("Connected to FreeDG storage MongoDB")
    } finally {
        await client.close();
    }
}