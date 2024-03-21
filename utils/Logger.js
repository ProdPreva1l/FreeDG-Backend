import chalk from 'chalk';

chalk.level = 1;

export default {
    debug, info, warn, severe, requestSuccess, requestDenied, requestError
}

export function debug(message) {
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
    console.info(chalk.red(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ACCESS DENIED]: [${req.ip}] {${req.method}} ${req.url}`));
}

export function requestError(req, message) {
    const now = new Date();
    console.error(chalk.redBright(`[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} SEVERE]: [${req.ip}] {${req.method}} ${req.url} ${message}`));
}