"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
class Forbidden extends Error {
    constructor(message = 'Action forbidden') {
        super(message);
        Object.setPrototypeOf(this, Forbidden.prototype);
    }
}
exports.Forbidden = Forbidden;
