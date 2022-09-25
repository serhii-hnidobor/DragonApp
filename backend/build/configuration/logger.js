"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const config_1 = require("./config");
const pino_1 = require("pino");
const enums_1 = require("../shared/enums/enums");
function initLogger() {
    let loggerOptions = {
        level: config_1.CONFIG.APP.LOGGER.level,
    };
    if (config_1.CONFIG.APP.NODE_ENV !== enums_1.AppEnvironment.PRODUCTION) {
        loggerOptions = Object.assign(Object.assign({}, loggerOptions), { transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: true,
                },
            } });
    }
    return (0, pino_1.pino)(loggerOptions);
}
const logger = initLogger();
exports.logger = logger;
