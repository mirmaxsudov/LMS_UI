import { useLingui } from '@lingui/react/macro';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

import type { Option } from '@/shared/ui/multi-combobox';

import { getGroupStudentsQueryOptions, GROUP_QUERY_KEYS } from '@/modules/group/options';
import { getStudents, patchAddStudentToGroup } from '@/shared/api';
import { useDebouncedValue } from '@/shared/hooks/useDeboucedValue';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';
import {
  MultiCombobox,
  MultiComboboxContent,
  MultiComboboxEmpty,
  MultiComboboxGroup,
  MultiComboboxInput,
  MultiComboboxItem,
  MultiComboboxList,
  MultiComboboxTrigger
} from '@/shared/ui/multi-combobox';
import { Spinner } from '@/shared/ui/spinner';

interface Props {
  groupId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStudentName = (student: Student) =>
  [student.baseData.firstName, student.baseData.middleName, student.baseData.lastName]
    .filter(Boolean)
    .join(' ');

export const ManageGroupStudentsDialog = ({ groupId, open, onOpenChange }: Props) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Option[]>([]);
  const debouncedSearch = useDebouncedValue(search);

  const groupStudentsQuery = useQuery({
    ...getGroupStudentsQueryOptions({ id: groupId }),
    enabled: open
  });

  useEffect(() => {
    if (!groupStudentsQuery.data) return;

    setSelected(
      groupStudentsQuery.data.data.data.map((student) => ({
        label: getStudentName(student),
        value: student.studentId
      }))
    );
  }, [groupStudentsQuery.data]);

  const studentsQuery = useInfiniteQuery({
    queryKey: ['students', 'manage-group-students-combobox', debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getStudents({
        params: {
          page: pageParam,
          name: debouncedSearch || undefined,
          size: 10
        }
      }),
    initialPageParam: 1,
    enabled: comboboxOpen,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.hasNext ? allPages.length + 1 : undefined
  });

  const students = studentsQuery.data?.pages.flatMap((page) => page.data.results) ?? [];
  const options = students.map((student) => ({
    label: getStudentName(student),
    value: student.studentId
  }));

  const comboboxData = useMemo(() => {
    const missing = selected.filter(
      (item) => !options.some((option) => option.value === item.value)
    );

    return [...missing, ...options];
  }, [options, selected]);

  const { ref } = useInView({
    threshold: 0,
    onChange: async (inView) => {
      if (inView && studentsQuery.hasNextPage && !studentsQuery.isFetchingNextPage) {
        await studentsQuery.fetchNextPage();
      }
    }
  });

  const mutation = useMutation({
    mutationFn: patchAddStudentToGroup,
    onSuccess: async () => {
      toast.success(t`Group students updated successfully`);
      await queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.base() });
      onOpenChange(false);
    },
    onError: () => {
      toast.error(t`Failed to update group students`);
    }
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t`Manage students`}</DialogTitle>
          <DialogDescription>{t`Add or remove students from this group.`}</DialogDescription>
        </DialogHeader>
        <MultiCombobox
          data={comboboxData}
          value={selected}
          onOpenChange={setComboboxOpen}
          onValueChange={setSelected}
          open={comboboxOpen}
          placeholder={t`Select students`}
        >
          <MultiComboboxTrigger className='h-auto min-h-10 w-full justify-start px-3 py-2'>
            <div className='flex min-w-0 flex-1 flex-wrap gap-2 text-sm! font-normal'>
              {selected.length ? (
                selected.map((student) => <span key={student.value}>{student.label}</span>)
              ) : (
                <span className='text-muted-foreground'>{t`Select students`}</span>
              )}
            </div>
          </MultiComboboxTrigger>
          <MultiComboboxContent>
            <MultiComboboxInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t`Search students`}
            />
            <MultiComboboxList>
              <MultiComboboxEmpty>{t`No students found.`}</MultiComboboxEmpty>
              <MultiComboboxGroup>
                {comboboxData.map((option) => (
                  <MultiComboboxItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label]}
                  >
                    {option.label}
                  </MultiComboboxItem>
                ))}
                <div ref={ref} />
                {(studentsQuery.isLoading || studentsQuery.isFetchingNextPage) && (
                  <div className='flex items-center justify-center py-2'>
                    <Spinner />
                  </div>
                )}
              </MultiComboboxGroup>
            </MultiComboboxList>
          </MultiComboboxContent>
        </MultiCombobox>
        <DialogFooter>
          <Button
            type='button'
            loading={mutation.isPending}
            onClick={() =>
              mutation.mutate({
                id: groupId,
                data: { studentIds: selected.map((student) => student.value) }
              })
            }
          >
            {t`Save`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
