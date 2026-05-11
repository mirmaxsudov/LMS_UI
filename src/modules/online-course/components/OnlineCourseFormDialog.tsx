import { useLingui } from '@lingui/react/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OnlineCourseForm } from '@/modules/online-course/components/OnlineCourseForm';
import { ONLINE_COURSE_QUERY_KEYS } from '@/modules/online-course/options';
import { postOnlineCourse, putOnlineCourse } from '@/shared/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';

interface OnlineCourseFormDialogProps {
  editValues: OnlineCourse | OnlineCoursePreview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OnlineCourseFormDialog = ({
  editValues,
  open,
  onOpenChange
}: OnlineCourseFormDialogProps) => {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editValues);

  const createMutation = useMutation({
    mutationFn: postOnlineCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: putOnlineCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ONLINE_COURSE_QUERY_KEYS.all() });
      onOpenChange(false);
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='max-h-[92svh] overflow-y-auto sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t`Edit online course` : t`Create online course`}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? t`Update the course landing details, publishing status, and thumbnail.`
              : t`Create a polished online course shell before adding modules and materials.`}
          </DialogDescription>
        </DialogHeader>
        <OnlineCourseForm
          defaultValues={editValues ?? undefined}
          isSubmitting={isSubmitting}
          submitLabel={isEditMode ? t`Update` : t`Create`}
          onSubmit={(data) => {
            if (editValues) {
              updateMutation.mutate({ courseId: editValues.id, data });
              return;
            }

            createMutation.mutate({ data });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
