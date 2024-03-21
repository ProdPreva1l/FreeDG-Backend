import {MongoClient} from "mongodb";
import {debug, mongo_uri} from "../config/Config.js";
import logger from "../utils/Logger.js";
import crypto from "crypto";

const client = new MongoClient(mongo_uri);

export default {
    init, destruct, checkForToken
}

export async function init() {
    await client.connect();
    await client.db("admin").command({ping:1});
    logger.info("Connected to FreeDG storage MongoDB")
}

export async function destruct(force) {
    await client.close(force);
    logger.info("Disconnected from FreeDG storage MongoDB")
}

export async function checkForToken(token) {
    logger.debug("check token")
    if (debug) {
        return true;
    }
    logger.debug("real check")
    let db = client.db("freeDG");
    let sha256 = crypto.createHash('sha256').update(token).digest("hex");
    return await db.collection("tokens").findOne({token: sha256}) != null;
}