export interface Pagination {
  limit: number;
  currentPage: number;
  records: number;
  totalPages: number;
}

export interface ResponseMetadata {
  code?: string;
  message?: string;
  pagination?: Pagination;
}
export default class BaseResponseDto {
  data: any;
  metadata: ResponseMetadata = {};
}
