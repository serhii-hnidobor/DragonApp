import { ExtendedError } from '~/shared/exceptions/extended-error';

export class Forbidden extends ExtendedError {
  constructor(message = 'Action forbidden', errorCode?: string) {
    super(message, errorCode);
    Object.setPrototypeOf(this, Forbidden.prototype);
  }
}
