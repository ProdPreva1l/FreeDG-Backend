export class BaseAPIVersion {
    constructor() {
        if(this.constructor === BaseAPIVersion) {
            throw new Error("Class is of abstract type and can't be instantiated");
        }
        if(this.getRedis === undefined) {
            throw new Error("getRedis method must be implemented");
        }
        if(this.getMongo === undefined) {
            throw new Error("getMongo method must be implemented");
        }
        if (this.getMysql === undefined) {
            throw new Error("getMysql method must be implemented")
        }
    }
}