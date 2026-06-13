import type { DateRange } from 'react-day-picker';

import { DownloadIcon, FileSpreadsheetIcon, FileTextIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerTrigger,
  DateRangePickerValue
} from '@/shared/ui/date-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';

const periodOptions = [
  { value: 'this-week', label: 'This week' },
  { value: 'this-month', label: 'This month' },
  { value: 'this-term', label: 'This term' },
  { value: 'this-year', label: 'This year' },
  { value: 'custom', label: 'Custom range' }
];

export const ReportsToolbar = () => {
  const [period, setPeriod] = useState('this-month');
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Select value={period} onValueChange={setPeriod}>
        <SelectTrigger className='w-40' size='sm'>
          <SelectValue placeholder='Select period' />
        </SelectTrigger>
        <SelectContent>
          {periodOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {period === 'custom' && (
        <DateRangePicker selected={range} onSelect={setRange}>
          <DateRangePickerTrigger className='w-60' size='sm'>
            <DateRangePickerValue placeholder='Select date range' />
          </DateRangePickerTrigger>
          <DateRangePickerContent>
            <DateRangePickerCalendar autoFocus />
          </DateRangePickerContent>
        </DateRangePicker>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='ml-auto' size='sm' variant='outline'>
            <DownloadIcon />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <FileTextIcon />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileSpreadsheetIcon />
            Export as Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
