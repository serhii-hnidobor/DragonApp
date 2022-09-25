"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryAdapter = void 0;
const inversify_1 = require("inversify");
const client_1 = require("@prisma/client");
const types_1 = require("../../../shared/types/types");
let UserRepositoryAdapter = class UserRepositoryAdapter {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async getAll() {
        return this.prismaClient.user.findMany();
    }
    async createUser(userRequestDto) {
        const user = await this.prismaClient.user.create({
            data: userRequestDto,
        });
        return {
            id: user.id,
            email: user.email,
        };
    }
};
UserRepositoryAdapter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.CONTAINER_TYPES.PrismaClient)),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], UserRepositoryAdapter);
exports.UserRepositoryAdapter = UserRepositoryAdapter;
