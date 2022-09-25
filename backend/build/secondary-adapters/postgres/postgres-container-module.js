"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresContainerModule = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../shared/types/types");
const user_repository_adapter_1 = require("./user/user-repository-adapter");
const client_1 = require("@prisma/client");
const postgresContainerModule = new inversify_1.AsyncContainerModule(async (bind) => {
    const client = new client_1.PrismaClient();
    await client.$connect();
    bind(types_1.CONTAINER_TYPES.UserRepository).to(user_repository_adapter_1.UserRepositoryAdapter);
    bind(types_1.CONTAINER_TYPES.PrismaClient)
        .toConstantValue(client)
        .onDeactivation(async (client) => {
        await client.$disconnect();
    });
});
exports.postgresContainerModule = postgresContainerModule;
