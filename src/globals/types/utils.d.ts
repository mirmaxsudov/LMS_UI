interface Pagination<T> {
  hasNext: boolean;
  message: string;
  page: number;
  results: T[];
  size: number;
  success: boolean;
  total: number;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

type Nullable<T> = T | null;

// APIs

type PaginationRequest = Partial<{
  page: number;
  size: number;
}>;
