import yaml_config from 'node-yaml-config';
import path from 'path';
import {fileURLToPath} from 'url';

let config;

export const env = process.argv[2].replace("--", "");

config = yaml_config.load(path.dirname(fileURLToPath(import.meta.url)) + "/config.yml", env);

export const bind = config.bind;
export const port = config.port;
export const mongo_uri = config.mongo_uri;
export const debug = config.debug;

export default {
    debug, env, mongo_uri, port, bind
}