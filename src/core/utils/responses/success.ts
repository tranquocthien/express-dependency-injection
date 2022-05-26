import { response, Response } from 'express';

response.success = function (
  data: any,
  message?: string,
  pagination?: any | undefined
): Response {
  let msg = 'success';
  if (message) {
    msg = message;
  }
  return this.send({
    data: data,
    metadata: {
      code: '200',
      message: msg,
      pagination: pagination
        ? {
            limit: pagination.limit,
            page: pagination.page,
            records: pagination.records,
            totalRecords: pagination.totalRecords,
          }
        : undefined,
    },
  });
};
