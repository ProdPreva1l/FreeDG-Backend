import logger from "./Logger.js";
import appStorage from "../database/AppStorage.js";

export default {
    auth, ignoreFavicon, notFoundFix
}

export function ignoreFavicon(err, req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end()
        return;
    }
    next();
}

export async function auth(req, res, next) {
    const token = req.headers.authorization;
    if (token === undefined) {
        logger.requestDenied(req)
        res.status(401).jsonp({error: 401, message: "Access Denied, Invalid or Unspecified Authorization header!"});
        res.end();
        return;
    }
    if (await appStorage.checkForToken(token)) {
        next();
    } else {
        logger.requestDenied(req)
        res.status(401).jsonp({error: 401, message: "Access Denied, Invalid or Unspecified Authorization header!"});
        res.end();
    }
}

export function notFoundFix(req, res, next) {
    logger.requestDebug(req, "Requested Resources Does Not Exist!")
    res.jsonp({error: 404, message: "Requested Resources Does Not Exist!"}).end();
}