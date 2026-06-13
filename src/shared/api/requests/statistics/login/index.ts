import { apiWithoutAuth } from '@/shared/api';

export const getLoginStatistics = () =>
  apiWithoutAuth.get<LoginStatisticResponse>('landing-statistics');
