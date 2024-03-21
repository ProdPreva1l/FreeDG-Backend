import chalk from 'chalk';
import Config from '../config/Config.js'

chalk.level = 1;

export default {
    debug, info, warn, severe, requestSuccess, requestDenied, requestError, requestDebug
}

export function debug(message) {
    if (!Config.debug) return;
    const now = new Date();
    console.info(chalk.blue(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} DEBUG]: ${message}`));
}

export function info(message) {
    const now = new Date();
    console.info(chalk.white(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} INFO]: ${message}`));
}

export function warn(message) {
    const now = new Date();
    console.warn(chalk.yellow(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} WARN]: ${message}`));
}

export function severe(message) {
    const now = new Date();
    console.error(chalk.redBright(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} SEVERE]: ${message}`));
}


export function requestSuccess(req) {
    const now = new Date();
    console.info(chalk.green(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} SUCCESS]: [${req.ip}] {${req.method}} ${req.url}`));
}

export function requestDenied(req) {
    const now = new Date();
    console.warn(chalk.redBright(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ACCESS DENIED]: [${req.ip}] {${req.method}} ${req.url}`));
}

export function requestError(req, message) {
    const now = new Date();
    console.error(chalk.red(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} SEVERE]: [${req.ip}] {${req.method}} ${req.url} ${message}`));
}

export function requestDebug(req, message) {
    const now = new Date();
    console.info(chalk.blue(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} DEBUG]: [${req.ip}] {${req.method}} ${req.url} ${message}`));
}
