export class Database {
    constructor(dbType, uri) {
        if(this.constructor === Database) {
            throw new Error("Class is of abstract type and can't be instantiated");
        }
        if(this.connect === undefined) {
            throw new Error("connect method must be implemented");
        }
        if(this.getDatabases === undefined) {
            throw new Error("getDatabases method must be implemented");
        }
        if (this.handleErrors === undefined) {
            throw new Error("handleErrors method must be implemented")
        }

        this.dbType = dbType;
        this.connectionURI = uri;
    }
}