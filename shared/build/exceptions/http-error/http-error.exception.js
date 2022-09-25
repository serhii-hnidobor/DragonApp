"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const enums_1 = require("../../common/enums/enums");
const DEFAULT_SERVER_ERROR = 'Network Error';
class HttpError extends Error {
    constructor({ message = DEFAULT_SERVER_ERROR, status = enums_1.HttpCode.INTERNAL_SERVER_ERROR } = {}) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpError = HttpError;
