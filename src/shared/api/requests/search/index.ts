import { api } from '@/shared/api';

export interface GetGlobalSearchRequest {
  signal?: AbortSignal;
  params: {
    query: string;
    types?: SearchResultType[];
  } & PaginationRequest;
}

export const getGlobalSearch = ({ params, signal }: GetGlobalSearchRequest) =>
  api.get<GlobalSearchResponse>('search', {
    params: {
      ...params,
      types: params.types?.join(',')
    },
    signal
  });
