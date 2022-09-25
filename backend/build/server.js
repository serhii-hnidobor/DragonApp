"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./configuration/logger");
const config_1 = require("./configuration/config");
class Server {
    constructor() {
        this.port = config_1.CONFIG.APP.PORT;
    }
    async run() {
        try {
            const app = await app_1.application.initialize();
            this.server = app.listen(this.port);
            this.server.on('listening', () => {
                var _a;
                const address = (_a = this.server) === null || _a === void 0 ? void 0 : _a.address();
                logger_1.logger.info(`Application start on port: ${address.port} Environment: ${config_1.CONFIG.APP.NODE_ENV}`);
            });
            this.server.on('error', (error) => {
                logger_1.logger.error(error, 'Server start error: ');
                process.exit(1);
            });
        }
        catch (error) {
            logger_1.logger.error(error, 'Application initialization error: ');
        }
    }
}
const server = new Server();
server.run();
