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
exports.AuthController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const api_1 = require("../../../shared/enums/api/api");
const types_1 = require("../../../shared/types/types");
const user_service_1 = require("../../../core/user/application/user-service");
let AuthController = class AuthController extends inversify_express_utils_1.BaseHttpController {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    signUp(userRequestDto) {
        return this.userService.createUser(userRequestDto);
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPost)(api_1.AuthApiPath.SIGN_UP),
    __param(0, (0, inversify_express_utils_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
AuthController = __decorate([
    (0, inversify_express_utils_1.controller)(api_1.ApiPath.AUTH),
    __param(0, (0, inversify_1.inject)(types_1.CONTAINER_TYPES.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
