"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
class BadRequest extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}
exports.BadRequest = BadRequest;
