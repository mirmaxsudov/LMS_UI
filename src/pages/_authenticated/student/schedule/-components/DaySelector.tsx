import { cn } from '@/shared/lib/utils';

interface DaySelectorProps {
  days: StudentScheduleDay[];
  selectedDayId: string;
  onSelect: (dayId: string) => void;
}

export const DaySelector = ({ days, selectedDayId, onSelect }: DaySelectorProps) => (
  <div className='grid grid-cols-3 gap-2 sm:grid-cols-6'>
    {days.map((day) => {
      const isSelected = day.id === selectedDayId;

      return (
        <button
          key={day.id}
          className={cn(
            'flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-colors',
            isSelected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'hover:bg-accent/50',
            !isSelected && day.isToday && 'border-primary/50'
          )}
          type='button'
          onClick={() => onSelect(day.id)}
        >
          <span className='text-xs font-medium uppercase opacity-80'>{day.shortLabel}</span>
          <span className='text-lg font-semibold tabular-nums'>{day.dayNumber}</span>
          <span
            className={cn(
              'text-[11px]',
              isSelected ? 'opacity-90' : 'text-muted-foreground'
            )}
          >
            {day.classes.length ? `${day.classes.length} classes` : 'No classes'}
          </span>
        </button>
      );
    })}
  </div>
);
