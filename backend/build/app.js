"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const pino_http_1 = __importDefault(require("pino-http"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
require("reflect-metadata");
const http_error_handlers_1 = require("./primary-adapters/rest/common/http-error-handlers");
const di_container_1 = require("./configuration/di-container");
const inversify_express_utils_1 = require("inversify-express-utils");
const config_1 = require("./configuration/config");
const logger_1 = require("./configuration/logger");
class Application {
    async initialize() {
        const diContainer = await (0, di_container_1.createDIContainer)(config_1.CONFIG.APP.DI_CONTAINER_MODULES_PATHS);
        const routingConfig = this.getRoutingConfig();
        this.app = new inversify_express_utils_1.InversifyExpressServer(diContainer, null, routingConfig);
        this.initMiddlewares();
        this.initErrorHandler();
        return this.app.build();
    }
    initMiddlewares() {
        var _a;
        (_a = this.app) === null || _a === void 0 ? void 0 : _a.setConfig((app) => {
            app.use((0, helmet_1.default)());
            app.use(body_parser_1.default.urlencoded({ 'extended': true }));
            app.use(body_parser_1.default.json());
            app.use((0, pino_http_1.default)({ logger: logger_1.logger }));
        });
    }
    initErrorHandler() {
        var _a;
        (_a = this.app) === null || _a === void 0 ? void 0 : _a.setErrorConfig((app) => {
            app.use(http_error_handlers_1.handleHttpError);
        });
    }
    getRoutingConfig() {
        return {
            rootPath: config_1.CONFIG.API.PREFIX,
        };
    }
}
const application = new Application();
exports.application = application;
