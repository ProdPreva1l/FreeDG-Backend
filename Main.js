import {bind, port} from './config/Config.js';
import logger from './utils/Logger.js';
import diversion, {UnknownVersion} from "./utils/Diversion.js";

import express from 'express';

const app = express();

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end()
        return;
    }
    next();
}

app.use(ignoreFavicon)

/**
 * Auth check
 */
app.all(`*`, async (req, res, next) => {
    try {
        const authKey = req.headers.authorization;
        if (authKey === undefined) {
            logger.requestDenied(req)
            res.status(401).jsonp({error: "401", message: "Access Denied, Invalid or Unspecified Authorization header!"});
            res.end();
            return;
        }
        if (await tokens.checkForToken(authKey)) {
            logger.info("Token Expires: " + await tokens.getTokenExpiry(authKey))
            next();
        } else {
            logger.requestDenied(req)
            res.status(401).jsonp({error: "401", message: "Access Denied, Invalid or Unspecified Authorization header!"});
            res.end();
        }
    } catch (e) {
        logger.requestError(req, e)
        if (e.message.includes("Cannot read properties of undefined")) {
            res.status(503).jsonp({error: "503", message: "Requested Resources Is Not Available!"});
            res.end();
        } else {
            res.status(500).jsonp({error: "500", message: "Internal Server Error Occurred!"});
            res.end();
        }
    }
});

/*
    Check if DB type exists in the API version, if it does, divert the request to that version.
 */

app.get(`/:apiVersion/:dbType/:operation`, async function (req, res) {
    let version = req.params.apiVersion;
    let dbType = req.params.dbType;
    let operation = req.params.operation;



    res.jsonp(
        await diversion.getAPIVersion(version)
            .then(() => {

            })
            .catch((error) => {
                if (error instanceof UnknownVersion) {
                    logger.warn(error);
                    return;
                }
                logger.severe(error);
            })
    );

    res.end();
    logger.success(req)
});

app.listen(port, bind, () => {
    logger.info(`Listening on ${bind}:${port}`);
});


