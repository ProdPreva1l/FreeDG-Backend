import {bind, port} from './config/Config.js';
import logger from './utils/Logger.js';
import diversion, {UnknownVersion} from "./utils/Diversion.js";
import appStorage from './database/AppStorage.js'
import express from 'express';
import {BaseDatabase, DatabaseType} from "./database/BaseDatabase.js";
import Middleware from "./utils/Middleware.js";

const app = express();

app.use(async (req, res, next) => await Middleware.auth(req,res,next));
app.use(Middleware.ignoreFavicon)

app.get(`/v:apiVersion/:dbType/:operation`, async function (req, res) {
    try {
        let version = parseInt(req.params.apiVersion);
        /**
         *
         * @type DatabaseType
         */
        let dbType = DatabaseType.valueOf(req.params.dbType.toUpperCase());
        let operation = req.params.operation;
        let uri = req.params.uri;

        /**
         * @type BaseAPIVersion
         */
        let api;
        try {
            api = diversion.getAPIVersion(version);
        } catch(error) {
            api = null;
            if (error instanceof UnknownVersion) {
                logger.warn(error.message);
                res.status(400).jsonp({error: 400, message: "Unknown API Version!"}).end();
                return;
            }
            logger.severe(error.message);
            res.status(500).jsonp({error: 500, message: "Internal Server Error Occurred!"}).end();
            return;
        }

        /**
         * @type BaseDatabase
         */
        let database;
        switch (dbType) {
            case DatabaseType.REDIS:
                database = api.getRedis(uri);
                break;
            default:
                database = null;
                break;
        }

        if (database === null) {
            res.status(400).jsonp({error: 400, message: `Database Type does not exist!`});
            res.end();
            logger.requestError(req, `Database Type ${req.params.dbType.toUpperCase()} does not exist!`);
            return;
        }
        database.connect();
        res.jsonp(database.getDatabases());
        database.close()
        res.end();
        logger.requestSuccess(req)
    } catch (e) {
        logger.requestError(req, e)
        res.status(500).jsonp({error: 500, message: "Internal Server Error Occurred!"});
        res.end();
    }
});

app.use(Middleware.notFoundFix);

app.listen(port, bind, async () => {
    logger.info(`Listening on ${bind}:${port}`);
    await appStorage.init().catch();
});

async function shutDown() {
    await appStorage.destruct();
}

process.on('SIGTERM', await shutDown);
process.on('SIGINT', await shutDown);
