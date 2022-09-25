"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicationError = void 0;
const bad_request_1 = require("./bad-request");
class DuplicationError extends bad_request_1.BadRequest {
    constructor(message = 'Already exists') {
        super(message);
        Object.setPrototypeOf(this, DuplicationError.prototype);
    }
}
exports.DuplicationError = DuplicationError;
