import { HttpError } from 'routing-controllers';
import { ERROR_CODE, ERROR_MESSAGE } from '../constants/errorMessage';

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_PERMISSION = 403,
  INTERNAL_ERROR = 500,
}

export default class BaseApiError extends HttpError {
  public readonly message: ERROR_MESSAGE;

  constructor(
    public readonly name: ERROR_CODE,
    httpCode: HttpStatusCode,
    public readonly args: any[] = []
  ) {
    super(httpCode);
    Object.setPrototypeOf(this, new.target.prototype);

    this.message = ERROR_MESSAGE[this.name];
  }

  toJSON() {
    return {
      data: null,
      metadata: {
        name: this.name,
        message: this.message,
        pagination: null,
      },
    };
  }
}
