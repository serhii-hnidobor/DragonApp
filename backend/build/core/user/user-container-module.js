"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userContainerModule = void 0;
const inversify_1 = require("inversify");
const user_service_1 = require("./application/user-service");
const types_1 = require("../../shared/types/types");
const userContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(types_1.CONTAINER_TYPES.UserService).to(user_service_1.UserService);
});
exports.userContainerModule = userContainerModule;
