"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
class Unauthorized extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
}
exports.Unauthorized = Unauthorized;
