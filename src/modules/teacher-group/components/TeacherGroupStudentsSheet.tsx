import { useLingui } from '@lingui/react/macro';

import { groupStatusColorMap, groupStatusLabelMap } from '@/modules/group';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/shared/ui/sheet';

import { useTeacherGroupStudents } from '../hooks';
import { getRoomName } from '../lib/format';
import { StatusPill } from './StatusPill';
import { TeacherGroupStudentsTable } from './TeacherGroupStudentsTable';

interface TeacherGroupStudentsSheetProps {
  group: TeacherGroup | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SummaryStatProps {
  label: string;
  value: string;
}

const SummaryStat = ({ label, value }: SummaryStatProps) => (
  <div className='bg-muted/40 rounded-lg border p-3'>
    <p className='text-muted-foreground text-xs'>{label}</p>
    <p className='text-lg font-semibold'>{value}</p>
  </div>
);

export const TeacherGroupStudentsSheet = ({
  group,
  open,
  onOpenChange
}: TeacherGroupStudentsSheetProps) => {
  const { t } = useLingui();
  const { students, overview, isLoading } = useTeacherGroupStudents(group?.id ?? null);

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className='w-full gap-0 sm:max-w-3xl'>
        {group && (
          <>
            <SheetHeader className='border-b'>
              <div className='flex items-center gap-2'>
                <SheetTitle>{group.groupName}</SheetTitle>
                <StatusPill
                  label={t(groupStatusLabelMap[group.status])}
                  color={groupStatusColorMap[group.status]}
                />
              </div>
              <SheetDescription>
                {group.course.title} · {getRoomName(group)}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className='flex-1'>
              <div className='space-y-4 p-4'>
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
                  <SummaryStat label='Students' value={`${group.currentStudents}/${group.capacity}`} />
                  <SummaryStat label='Progress' value={`${group.syllabusProgress.percentage}%`} />
                  <SummaryStat
                    label='Avg. attendance'
                    value={overview ? `${overview.averageAttendance}%` : '—'}
                  />
                  <SummaryStat label='Avg. grade' value={overview ? `${overview.averageGrade}` : '—'} />
                </div>

                <div>
                  <h3 className='mb-3 text-sm font-semibold'>Students</h3>
                  <TeacherGroupStudentsTable students={students} isLoading={isLoading} />
                </div>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
