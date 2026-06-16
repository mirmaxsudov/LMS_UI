import type { GetRoomsRequest } from '@/shared/api';
import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { booleanFilterOptions, roomStatusOptions, roomTypeOptions } from '@/modules/room/constants';

type FilterConfig = FilterMap[keyof FilterMap];

export type RoomFilterValues = Record<string, string | undefined>;

const asString = (value?: string) => (value && value.trim().length > 0 ? value : undefined);

const asNumber = (value?: string) => {
  const val = asString(value);
  if (!val) return undefined;

  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const asBoolean = (value?: string) => {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return undefined;
};

export const roomsFiltersConfig: FilterConfig[] = [
  {
    variant: 'search',
    key: 'search',
    placeholder: 'Search'
  },
  {
    variant: 'select',
    key: 'roomType',
    placeholder: 'Type',
    options: roomTypeOptions
  },
  {
    variant: 'select',
    key: 'status',
    placeholder: 'Status',
    options: roomStatusOptions
  },
  {
    variant: 'search',
    key: 'building',
    placeholder: 'Building'
  },
  {
    variant: 'search',
    key: 'floor',
    placeholder: 'Floor'
  },
  {
    variant: 'search',
    key: 'minCapacity',
    placeholder: 'Min capacity'
  },
  {
    variant: 'search',
    key: 'maxCapacity',
    placeholder: 'Max capacity'
  },
  {
    variant: 'select',
    key: 'hasProjector',
    placeholder: 'Projector',
    options: booleanFilterOptions
  },
  {
    variant: 'select',
    key: 'hasComputers',
    placeholder: 'Computers',
    options: booleanFilterOptions
  }
];

export const mapRoomsFiltersToParams = (values: RoomFilterValues): GetRoomsRequest['params'] => ({
  search: asString(values.search),
  roomType: asString(values.roomType) as RoomType | undefined,
  status: asString(values.status) as RoomStatus | undefined,
  building: asString(values.building),
  floor: asNumber(values.floor),
  minCapacity: asNumber(values.minCapacity),
  maxCapacity: asNumber(values.maxCapacity),
  hasProjector: asBoolean(values.hasProjector),
  hasComputers: asBoolean(values.hasComputers)
});
