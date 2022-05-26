import { ERROR_CODE } from '../constants/errorMessage';
import BaseApiError, { HttpStatusCode } from './baseError';

export default class NotFoundError extends BaseApiError {
  constructor(name: ERROR_CODE, args: any[] = []) {
    super(name, HttpStatusCode.NOT_FOUND, args);
  }
}
