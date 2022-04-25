export interface PaginationData<T> {
  page: number;
  limit: number;
  lastPage: number;
  total: number;
  data: T[];
}