import type { AxiosResponse } from 'axios';

import { infiniteQueryOptions } from '@tanstack/react-query';

import type {
  InfiniteQueryFactoryParams,
  ParentFiltersParams,
  StudentFiltersParams,
  TeacherFiltersParams,
  UserEntityType
} from '@/features/user/types';

import { getParents, getStudents, getTeachers } from '@/shared/api';

const DEFAULT_PAGE_SIZE = 10;

const USER_QUERY_KEYS = {
  infinite: <TFilters extends object>(
    entity: UserEntityType,
    params?: InfiniteQueryFactoryParams<TFilters>
  ) => ['users', entity, 'infinite', params] as const
};

const createInfiniteQueryOptionsFactory = <
  TFilters extends object,
  TResponse extends Pagination<unknown>
>(
  entity: UserEntityType,
  queryFn: (request?: {
    params?: Partial<TFilters> & PaginationRequest;
  }) => Promise<AxiosResponse<TResponse>>
) => {
  return (params?: InfiniteQueryFactoryParams<TFilters>) =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEYS.infinite(entity, params),
      initialPageParam: 1,
      queryFn: ({ pageParam }) => {
        const requestParams = {
          ...(params?.filters ?? {}),
          page: pageParam,
          size: params?.pageSize ?? DEFAULT_PAGE_SIZE
        } as Partial<TFilters> & PaginationRequest;

        return queryFn({
          params: requestParams
        });
      },
      getNextPageParam: (lastPage) => (lastPage.data.hasNext ? lastPage.data.page + 1 : undefined)
    });
};

const teachersInfiniteFactory = createInfiniteQueryOptionsFactory<
  TeacherFiltersParams,
  TeachersResponse
>('teachers', getTeachers);
const studentsInfiniteFactory = createInfiniteQueryOptionsFactory<
  StudentFiltersParams,
  StudentsResponse
>('students', getStudents);
const parentsInfiniteFactory = createInfiniteQueryOptionsFactory<
  ParentFiltersParams,
  ParentsResponse
>('parents', getParents);

export const getTeachersInfiniteQueryOptions = (
  params?: InfiniteQueryFactoryParams<TeacherFiltersParams>
) => teachersInfiniteFactory(params);

export const getStudentsInfiniteQueryOptions = (
  params?: InfiniteQueryFactoryParams<StudentFiltersParams>
) => studentsInfiniteFactory(params);

export const getParentsInfiniteQueryOptions = (
  params?: InfiniteQueryFactoryParams<ParentFiltersParams>
) => parentsInfiniteFactory(params);
