import { useLingui } from '@lingui/react/macro';

import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { Button } from '@/shared/ui/button';
import {
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerTrigger,
  DateRangePickerValue
} from '@/shared/ui/date-picker';

type Filter = FilterMap['date-range'];

interface ValueType {
  end_date: string | null;
  start_date: string | null;
}

interface Props {
  filter: Filter;
  value: ValueType;
  setVal: (value?: ValueType) => void;
}

export const DateRangeFilter = ({ setVal, value, filter }: Props) => {
  const { t } = useLingui();

  return (
    <>
      <DateRangePicker
        selected={{
          from: value?.start_date ? new Date(value.start_date) : undefined,
          to: value?.end_date ? new Date(value.end_date) : undefined
        }}
        dateFormat={filter.dateFormat || 'yyyy-MM-dd'}
        onSelect={(date) => {
          setVal({
            start_date: date?.from?.toDateString() || null,
            end_date: date?.to?.toDateString() || null
          });
        }}
      >
        <DateRangePickerTrigger className='w-60' size='sm'>
          <DateRangePickerValue placeholder={`Select date`} />
        </DateRangePickerTrigger>
        <DateRangePickerContent>
          <DateRangePickerCalendar
            autoFocus
            defaultMonth={value?.start_date ? new Date(value.start_date) : undefined}
          />
          {value?.start_date && (
            <div
              className='p-2'
              onClick={() =>
                setVal({
                  start_date: null,
                  end_date: null
                })
              }
            >
              <Button className='w-full' size='sm' variant='outline'>{t`Clear`}</Button>
            </div>
          )}
        </DateRangePickerContent>
      </DateRangePicker>
    </>
  );
};
