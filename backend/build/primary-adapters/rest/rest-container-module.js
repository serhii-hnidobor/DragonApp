"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restContainerModule = void 0;
const inversify_1 = require("inversify");
const user_controller_1 = require("./user/user-controller");
const types_1 = require("../../shared/types/types");
const auth_controller_1 = require("./auth/auth-controller");
const restContainerModule = new inversify_1.ContainerModule((bind) => {
    bind(types_1.CONTAINER_TYPES.UserController).to(user_controller_1.UserController);
    bind(types_1.CONTAINER_TYPES.AuthController).to(auth_controller_1.AuthController);
});
exports.restContainerModule = restContainerModule;
