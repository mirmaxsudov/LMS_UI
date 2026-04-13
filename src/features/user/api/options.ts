import type { AxiosResponse } from 'axios';

import { queryOptions } from '@tanstack/react-query';

import type {
  ParentFiltersParams,
  QueryFactoryParams,
  StudentFiltersParams,
  TeacherFiltersParams,
  UserEntityType,
  UserPreviewFiltersParams
} from '@/features/user';

import { getAllUserPreviews, getParents, getStudents, getTeachers } from '@/shared/api';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

const USER_QUERY_KEYS = {
  list: <TFilters extends object>(entity: UserEntityType, params?: QueryFactoryParams<TFilters>) =>
    ['users', entity, 'list', params] as const
};

const createQueryOptionsFactory = <TFilters extends object, TResponse extends Pagination<unknown>>(
  entity: UserEntityType,
  queryFn: (request?: {
    params?: Partial<TFilters> & PaginationRequest;
  }) => Promise<AxiosResponse<TResponse>>
) => {
  return (params?: QueryFactoryParams<TFilters>) =>
    queryOptions({
      queryKey: USER_QUERY_KEYS.list(entity, params),
      queryFn: () => {
        const requestParams = {
          ...(params?.filters ?? {}),
          page: params?.page ?? DEFAULT_PAGE,
          size: params?.size ?? DEFAULT_PAGE_SIZE
        } as Partial<TFilters> & PaginationRequest;

        return queryFn({
          params: requestParams
        });
      }
    });
};

const teachersQueryFactory = createQueryOptionsFactory<TeacherFiltersParams, TeachersResponse>(
  'teachers',
  getTeachers
);

const studentsQueryFactory = createQueryOptionsFactory<StudentFiltersParams, StudentsResponse>(
  'students',
  getStudents
);

const parentsQueryFactory = createQueryOptionsFactory<ParentFiltersParams, ParentsResponse>(
  'parents',
  getParents
);

const allUsersQueryFactory = createQueryOptionsFactory<UserPreviewFiltersParams, UserPreviewsResponse>(
  'all',
  getAllUserPreviews
);

export const getTeachersQueryOptions = (params?: QueryFactoryParams<TeacherFiltersParams>) =>
  teachersQueryFactory(params);

export const getStudentsQueryOptions = (params?: QueryFactoryParams<StudentFiltersParams>) =>
  studentsQueryFactory(params);

export const getParentsQueryOptions = (params?: QueryFactoryParams<ParentFiltersParams>) =>
  parentsQueryFactory(params);

export const getAllUsersQueryOptions = (params?: QueryFactoryParams<UserPreviewFiltersParams>) =>
  allUsersQueryFactory(params);
