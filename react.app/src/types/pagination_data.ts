export interface PaginationData<T> {
  page: number;
  limit: number;
  lastPage: number;
  data: T[];
}