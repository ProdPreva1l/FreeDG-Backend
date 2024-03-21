export class BaseDatabase {
    #uri;
    constructor(uri) {
        if (this.constructor === BaseDatabase) {
            throw new Error("Class is of abstract type and can't be instantiated");
        }
        this.#handleErrors()
        this.#uri = uri;
    }

    connect() {
        return undefined;
    }
    close() {
        return undefined;
    }
    getDatabases() {
        return undefined;
    }
    #handleErrors() {
        return undefined;
    }
}

export class DatabaseType {
    static REDIS = new DatabaseType("redis");
    static MONGO = new DatabaseType("mongodb");
    static MYSQL = new DatabaseType("mysql");
    static POSTGRES = new DatabaseType("postgresql");
    constructor(name) {
        this.name = name;
    }

    static valueOf(name) {
        switch (name.toUpperCase()) {
            case "REDIS": return DatabaseType.REDIS;
            case "MONGO": return DatabaseType.MONGO;
            case "MYSQL": return DatabaseType.MYSQL;
            case "POSTGRES": return DatabaseType.POSTGRES;
            default: throw new Error("Database type does not exist!");
        }
    }
}