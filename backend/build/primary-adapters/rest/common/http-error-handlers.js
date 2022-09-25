"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpError = void 0;
const api_error_1 = require("./data/api-error");
const exceptions_1 = require("../../../shared/exceptions/exceptions");
const logger_1 = require("../../../configuration/logger");
class NotFoundErrorHandler {
    handle(error) {
        logger_1.logger.error(error, 'Not Found');
        return {
            errors: [new api_error_1.ApiError(error.message)],
            code: 404,
        };
    }
}
class BadRequestErrorHandler {
    handle(error) {
        logger_1.logger.error(error, 'Bad request');
        return {
            errors: [new api_error_1.ApiError(error.message)],
            code: 400,
        };
    }
}
class UnauthorizedErrorHandler {
    handle(error) {
        logger_1.logger.error(error, 'Bad request');
        return {
            errors: [new api_error_1.ApiError(error.message)],
            code: 401,
        };
    }
}
class ForbiddenErrorHandler {
    handle(error) {
        logger_1.logger.error(error, 'Forbidden');
        return {
            errors: [new api_error_1.ApiError(error.message)],
            code: 403,
        };
    }
}
class UnhandledErrorHandler {
    handle(error) {
        logger_1.logger.error(error, 'Unhandled exception');
        return {
            errors: [new api_error_1.ApiError(error.message)],
            code: 500,
        };
    }
}
const getErrorHandler = (error) => {
    if (error instanceof exceptions_1.NotFound) {
        return new NotFoundErrorHandler();
    }
    if (error instanceof exceptions_1.Unauthorized) {
        return new UnauthorizedErrorHandler();
    }
    if (error instanceof exceptions_1.BadRequest) {
        return new BadRequestErrorHandler();
    }
    if (error instanceof exceptions_1.Forbidden) {
        return new ForbiddenErrorHandler();
    }
    return new UnhandledErrorHandler();
};
const handleHttpError = (error, request, response, next) => {
    const handler = getErrorHandler(error);
    const { code, errors } = handler.handle(error, request);
    response.status(code).json(errors);
    next();
};
exports.handleHttpError = handleHttpError;
