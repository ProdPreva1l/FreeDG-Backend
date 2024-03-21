import {APIVersionOne} from "../versions/APIVersionOne.js";
import logger from "./Logger.js";

export default {
    getAPIVersion
}

export function getAPIVersion(version) {
    logger.debug("apiversion getter")
    if (typeof(version) === "number") {
        switch (version) {
            case 1:
                return new APIVersionOne();
            default:
                throw new UnknownVersion(`The api version ${version} does not exist!`);
        }
    } else {
        logger.debug("not number lol")
        throw new UnknownVersion(`The api version ${version} does not exist!`);
    }
}

export class UnknownVersion extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnknownVersion';
    }
}