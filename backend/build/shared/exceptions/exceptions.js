"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.NotFound = exports.Forbidden = exports.DuplicationError = exports.BadRequest = void 0;
var bad_request_1 = require("./bad-request");
Object.defineProperty(exports, "BadRequest", { enumerable: true, get: function () { return bad_request_1.BadRequest; } });
var duplication_error_1 = require("./duplication-error");
Object.defineProperty(exports, "DuplicationError", { enumerable: true, get: function () { return duplication_error_1.DuplicationError; } });
var forbidden_1 = require("./forbidden");
Object.defineProperty(exports, "Forbidden", { enumerable: true, get: function () { return forbidden_1.Forbidden; } });
var not_found_1 = require("./not-found");
Object.defineProperty(exports, "NotFound", { enumerable: true, get: function () { return not_found_1.NotFound; } });
var unauthorized_1 = require("./unauthorized");
Object.defineProperty(exports, "Unauthorized", { enumerable: true, get: function () { return unauthorized_1.Unauthorized; } });