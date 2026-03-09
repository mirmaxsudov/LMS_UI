import { useLingui } from '@lingui/react/macro';

import type { FilterMap } from '@/shared/ui/filter/FilterToolbar';

import { formatLocaleDate } from '@/shared/lib/format.ts';
import { Button } from '@/shared/ui/button';
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerTrigger,
  DatePickerValue
} from '@/shared/ui/date-picker';

type DateFilter = FilterMap['date'];

interface DateFilterInputProps {
  filter: DateFilter;
  val?: string;
  setVal: (val: string | null) => void;
}

export const DateFilterInput = ({ filter, setVal, val }: DateFilterInputProps) => {
  const { t } = useLingui();

  return (
    <div className='flex flex-col gap-1'>
      <DatePicker
        selected={val ? new Date(val) : undefined}
        dateFormat={filter.dateFormat || 'yyyy-MM-dd'}
        onSelect={async (e) => {
          setVal?.(e ? formatLocaleDate(e, filter.dateFormat || 'yyyy-MM-dd') : null);
        }}
      >
        <DatePickerTrigger size='sm'>
          <DatePickerValue placeholder={filter.placeholder || t`Select date`} />
        </DatePickerTrigger>
        <DatePickerContent>
          <DatePickerCalendar />
          {!!val && (
            <div className='p-2'>
              <Button
                className='w-full'
                size='sm'
                variant='outline'
                onClick={() => setVal(null)}
              >{t`Clear`}</Button>
            </div>
          )}
        </DatePickerContent>
      </DatePicker>
    </div>
  );
};
