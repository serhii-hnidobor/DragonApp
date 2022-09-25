"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTAINER_TYPES = void 0;
const CONTAINER_TYPES = {
    UserController: Symbol.for('UserController'),
    AuthController: Symbol.for('AuthController'),
    UserService: Symbol.for('UserService'),
    UserRepository: Symbol.for('UserRepository'),
    PrismaClient: Symbol.for('PrismaClient'),
};
exports.CONTAINER_TYPES = CONTAINER_TYPES;
