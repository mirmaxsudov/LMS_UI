import { useLingui } from '@lingui/react/macro';
import { addMonths, subMonths } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const CalendarToolbar = ({ currentDate, setCurrentDate }: Props) => {
  const { t } = useLingui();
  const handlePrevious = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button
        aria-label='Previous'
        className='max-sm:size-8'
        size='icon'
        variant='ghost'
        onClick={handlePrevious}
      >
        <ChevronLeftIcon aria-hidden='true' size={16} />
      </Button>
      <Button
        aria-label='Next'
        className='max-sm:size-8'
        size='icon'
        variant='ghost'
        onClick={handleNext}
      >
        <ChevronRightIcon aria-hidden='true' size={16} />
      </Button>
      <Button variant='outline' onClick={handleToday}>{t`Today`}</Button>
    </div>
  );
};
