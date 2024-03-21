import yaml_config from 'node-yaml-config';
import path from 'path';
import {fileURLToPath} from 'url';

let config;

let env = process.argv[2].replace("--", "");
if (env )
config = yaml_config.load(path.dirname(fileURLToPath(import.meta.url)) + "/config.yml", env);

export const bind = config.bind;
export const port = config.port;
export const mongo_uri = config.mongo_uri;