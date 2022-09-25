import { HttpCode } from '../../common/enums/enums';
declare class HttpError extends Error {
    status: HttpCode;
    constructor({ message, status }?: {
        message?: string | undefined;
        status?: HttpCode | undefined;
    });
}
export { HttpError };
