import type { Option } from '@/shared/ui/filter/FilterToolbar';

export const groupStatusLabelMap: Record<GroupStatus, string> = {
  ACTIVE: 'Active',
  CANCELLED: 'Cancelled',
  FINISHED: 'Finished',
  FORMING: 'Forming'
};

export const groupStatusOptions: Option[] = Object.entries(groupStatusLabelMap).map(
  ([value, label]) => ({
    value,
    label
  })
);

export const groupActiveOptions: Option[] = [
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' }
];
