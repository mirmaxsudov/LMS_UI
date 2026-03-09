interface Pagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
