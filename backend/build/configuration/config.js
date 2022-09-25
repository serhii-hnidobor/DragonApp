"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const dotenv_1 = require("dotenv");
const enums_1 = require("../shared/enums/enums");
const isDevEnvironment = (nodeEnv = '') => nodeEnv === enums_1.AppEnvironment.DEVELOPMENT;
const configuration = () => {
    (0, dotenv_1.config)();
    const { NODE_ENV, HOST, PORT, DATABASE_URL, API_BASE_PREFIX } = process.env;
    const host = HOST || 'localhost';
    const port = Number(PORT) || 5000;
    const extension = isDevEnvironment(NODE_ENV) ? '.ts' : '.js';
    return {
        APP: {
            PORT: port,
            HOST: `http://${host}:${port}`,
            NODE_ENV: NODE_ENV || enums_1.AppEnvironment.DEVELOPMENT,
            LOGGER: {
                level: isDevEnvironment(NODE_ENV) ? enums_1.LogLevel.DEBUG : enums_1.LogLevel.INFO,
            },
            DI_CONTAINER_MODULES_PATHS: [
                __dirname + '/../core/**/*-container-module' + extension,
                __dirname + '/../primary-adapters/**/*-container-module' + extension,
                __dirname + '/../secondary-adapters/**/*-container-module' + extension,
            ],
        },
        DATABASE: {
            DATABASE_URL: DATABASE_URL || '',
        },
        API: {
            PREFIX: API_BASE_PREFIX || '',
        },
    };
};
const CONFIG = configuration();
exports.CONFIG = CONFIG;
