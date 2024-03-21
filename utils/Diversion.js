import {APIVersionOne} from "../versions/APIVersionOne.js";

export default {
    getAPIVersion
}

export function getAPIVersion(version) {
    if (version instanceof Number) {
        switch (version) {
            case 1: return new APIVersionOne();
            default: return new UnknownVersion(`The api version ${version} does not exist!`);
        }
    } else {
        return new UnknownVersion(`The api version ${version} does not exist!`);
    }
}

export class UnknownVersion extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnknownVersion';
    }
}