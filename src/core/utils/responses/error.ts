import { response, Response } from 'express';

response.error = function (
  message: string,
  statusCode?: number | undefined
): Response {
  let msg = 'system error';
  let code = 200;
  if (statusCode) {
    code = statusCode;
  }
  if (message) {
    msg = message;
  }
  return this.status(code).send({
    data: {},
    metadata: {
      code: code,
      message: msg,
    },
  });
};
